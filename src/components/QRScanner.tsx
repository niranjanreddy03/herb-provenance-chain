import { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Square, Scan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRScannerProps {
  onScan: (result: string) => void;
  isActive?: boolean;
}

export const QRScanner = ({ onScan, isActive = false }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if camera is available
    console.log('Checking camera availability...');
    QrScanner.hasCamera().then(hasCamera => {
      console.log('Camera available:', hasCamera);
      setHasCamera(hasCamera);
    }).catch(error => {
      console.error('Error checking camera:', error);
      setHasCamera(false);
    });

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (isActive && isScanning && videoRef.current && hasCamera) {
      startScanning();
    } else {
      stopScanning();
    }
  }, [isActive, isScanning, hasCamera]);

  const startScanning = async () => {
    if (!videoRef.current || !hasCamera) {
      console.log('Cannot start scanning:', { videoRef: !!videoRef.current, hasCamera });
      return;
    }

    try {
      console.log('Starting QR scanner...');
      
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          console.log('QR Code detected:', result.data);
          onScan(result.data);
          setIsScanning(false);
          toast({
            title: "QR Code Scanned",
            description: "Successfully scanned QR code",
          });
        },
        {
          highlightScanRegion: true,
          preferredCamera: 'environment',
          maxScansPerSecond: 5,
        }
      );

      console.log('QR Scanner created, starting...');
      await qrScannerRef.current.start();
      console.log('QR Scanner started successfully');
      
    } catch (error) {
      console.error('Error starting QR scanner:', error);
      
      let errorMessage = "Failed to start camera scanner";
      if (error && typeof error === 'object' && 'name' in error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = "Camera permission denied. Please allow camera access and try again.";
        } else if (error.name === 'NotFoundError') {
          errorMessage = "No camera found on this device.";
        } else if (error.name === 'NotSupportedError') {
          errorMessage = "Camera not supported on this device.";
        }
      }
      
      toast({
        title: "Scanner Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  if (!hasCamera) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            QR Code Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Camera not available or permission denied</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="w-5 h-5" />
          QR Code Scanner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative aspect-square max-w-sm mx-auto bg-muted rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${isScanning ? 'block' : 'hidden'}`}
              playsInline
              muted
            />
            {!isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Square className="w-24 h-24 text-muted-foreground opacity-50" />
              </div>
            )}
          </div>
          
          <div className="text-center">
            <Button
              onClick={toggleScanning}
              variant={isScanning ? "outline" : "default"}
              className="w-full"
            >
              {isScanning ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Stop Scanning
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Start Scanning
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};