import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, QrCode as QrCodeIcon } from "lucide-react";

interface QRGeneratorProps {
  data: string;
  title?: string;
  size?: number;
}

export const QRGenerator = ({ data, title = "QR Code", size = 200 }: QRGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    if (data) {
      generateQRCode();
    }
  }, [data]);

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(data, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `${title.replace(/\s+/g, '_')}_QR.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCodeIcon className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          No data provided for QR code generation
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCodeIcon className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {qrCodeUrl && (
          <div className="space-y-4">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="mx-auto border border-border rounded-lg"
            />
            <Button onClick={downloadQRCode} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};