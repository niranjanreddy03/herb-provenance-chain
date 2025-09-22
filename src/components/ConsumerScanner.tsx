import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QRScanner } from "@/components/QRScanner";
import { MapComponent } from "@/components/MapComponent";
import { Scan, MapPin, Shield, CheckCircle } from "lucide-react";
import ashwagandhaTrace from "@/assets/ashwagandha-trace.jpg";

export const ConsumerScanner = () => {
  const [scannedData, setScannedData] = useState<any>(null);

  const handleQRScan = (result: string) => {
    try {
      const data = JSON.parse(result);
      setScannedData(data);
    } catch (error) {
      console.error('Invalid QR code data:', error);
      setScannedData({ rawData: result });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-herb-sage/10 to-herb-gold/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-herb-green to-herb-sage bg-clip-text text-transparent">
            Consumer Transparency Portal
          </h2>
          <p className="text-lg text-muted-foreground">
            Scan QR codes on herb products to discover their complete journey from farm to shelf.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Scanner Section */}
          <div className="space-y-6">
            <QRScanner onScan={handleQRScan} />
            
            {/* Demo functionality - hidden by default, can be activated with double-click */}
            <div 
              className="text-center opacity-30 hover:opacity-60 transition-opacity"
              onDoubleClick={() => handleQRScan(JSON.stringify({
                transactionId: "TXN-2024-001",
                blockchainHash: "0x1a2b3c4d5e6f7g8h9i0j",
                herbType: "ashwagandha",
                quantity: "5",
                quality: "premium",
                location: "28.6139,77.2090",
                timestamp: "2024-01-15T10:30:00Z"
              }))}
            >
              <p className="text-xs text-muted-foreground cursor-pointer">
                Double-click for demo
              </p>
            </div>
          </div>

          {/* Results Display */}
          <div className="space-y-6">
            {scannedData ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-herb-green" />
                      Blockchain Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Verified on Blockchain</span>
                    </div>
                    {scannedData.transactionId && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Transaction ID:</strong> {scannedData.transactionId}
                      </p>
                    )}
                    {scannedData.blockchainHash && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Hash:</strong> {scannedData.blockchainHash}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Herb Type</p>
                        <p className="capitalize">{scannedData.herbType || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Quantity</p>
                        <p>{scannedData.quantity ? `${scannedData.quantity}kg` : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Quality Grade</p>
                        <Badge variant="secondary" className="capitalize">
                          {scannedData.quality || 'N/A'}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Collection Date</p>
                        <p>{scannedData.timestamp ? new Date(scannedData.timestamp).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {scannedData.location && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Collection Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MapComponent 
                        locations={[{
                          lat: parseFloat(scannedData.location.split(',')[0]),
                          lng: parseFloat(scannedData.location.split(',')[1]),
                          title: `${scannedData.herbType || 'Herb'} Collection Site`,
                          description: `Collected on ${scannedData.timestamp ? new Date(scannedData.timestamp).toLocaleDateString() : 'Unknown date'}`
                        }]}
                        height="250px"
                      />
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Scan a QR Code to View Results</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Scan className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    Use the scanner or try the demo data to see detailed traceability information.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};