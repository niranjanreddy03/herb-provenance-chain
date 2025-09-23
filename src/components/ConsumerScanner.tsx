import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QRScanner } from "@/components/QRScanner";
import { MapComponent } from "@/components/MapComponent";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import { Scan, MapPin, Shield, CheckCircle, Package, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ashwagandhaTrace from "@/assets/ashwagandha-trace.jpg";

export const ConsumerScanner = () => {
  const [scannedData, setScannedData] = useState<any>(null);
  const { toast } = useToast();

  // Mock tracking events for demo - in real app this would come from the backend
  const generateTrackingEvents = (productData: any) => {
    const baseEvents = [
      {
        id: '1',
        eventType: 'collection',
        status: 'completed',
        location: productData.locationAddress || 'Farm Location',
        timestamp: productData.collectionDate || productData.timestamp,
        description: `${productData.herbType?.charAt(0)?.toUpperCase() + productData.herbType?.slice(1) || 'Herb'} collected and verified`,
        performedBy: 'Certified Farmer'
      },
      {
        id: '2',
        eventType: 'quality-check',
        status: 'completed',
        location: 'Quality Control Lab',
        timestamp: new Date(new Date(productData.collectionDate || productData.timestamp).getTime() + 2 * 60 * 60 * 1000).toISOString(),
        description: `Quality grade verified as ${productData.quality || 'standard'}`,
        performedBy: 'QC Inspector'
      },
      {
        id: '3',
        eventType: 'processing',
        status: 'completed',
        location: 'Processing Facility',
        timestamp: new Date(new Date(productData.collectionDate || productData.timestamp).getTime() + 6 * 60 * 60 * 1000).toISOString(),
        description: 'Cleaned, dried, and prepared for packaging',
        performedBy: 'Processing Team'
      },
      {
        id: '4',
        eventType: 'packaging',
        status: 'completed',
        location: 'Packaging Center',
        timestamp: new Date(new Date(productData.collectionDate || productData.timestamp).getTime() + 12 * 60 * 60 * 1000).toISOString(),
        description: `Packaged ${productData.quantity || '0'}kg in sealed containers`,
        performedBy: 'Packaging Team'
      },
      {
        id: '5',
        eventType: 'shipping',
        status: 'in-progress',
        location: 'Distribution Center',
        timestamp: new Date(new Date(productData.collectionDate || productData.timestamp).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        description: 'Ready for shipping to retailers',
        performedBy: 'Logistics Team'
      }
    ];

    return baseEvents;
  };

  const handleQRScan = async (result: string) => {
    try {
      // First try to parse as JSON (direct QR data)
      let qrData;
      try {
        qrData = JSON.parse(result);
      } catch {
        // If not JSON, treat as raw data
        qrData = { rawData: result };
      }

      // If we have structured QR data, fetch full details from backend
      if (qrData.transactionId || qrData.id) {
        console.log('Fetching product details for QR data:', qrData);
        
        const { data: productDetails, error } = await supabase.functions.invoke('get-product-details', {
          body: { qrData: result }
        });

        if (error) {
          console.error('Error fetching product details:', error);
          toast({
            title: "Error",
            description: "Failed to fetch product details",
            variant: "destructive",
          });
          setScannedData(qrData); // Fall back to original QR data
        } else {
          console.log('Successfully fetched product details:', productDetails);
          setScannedData(productDetails);
          toast({
            title: "Product Verified",
            description: "Successfully retrieved blockchain-verified product details",
          });
        }
      } else {
        // Use original QR data if no transaction ID
        setScannedData(qrData);
      }
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
            Blockchain Product Tracking
          </h2>
          <p className="text-lg text-muted-foreground">
            Scan QR codes to track your herb products' complete journey from farm to shelf - powered by blockchain technology.
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
                id: "demo-id-12345",
                transactionId: "txn_demo123456789",
                blockchainHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
                herbType: "ashwagandha",
                quantity: "5",
                quality: "premium",
                location: "28.6139,77.2090",
                locationAddress: "Certified Organic Farm, Delhi Region, India",
                timestamp: "2024-01-15T10:30:00Z",
                collectionDate: "2024-01-15T10:30:00Z",
                verified: true,
                status: "recorded"
              }))}
            >
              <p className="text-xs text-muted-foreground cursor-pointer">
                Double-click for demo tracking
              </p>
            </div>
          </div>

          {/* Results Display */}
          <div className="space-y-6">
            {scannedData ? (
              <div className="space-y-6">
                {/* Tracking Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-herb-green" />
                      Product Tracking Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-herb-green" />
                        <span className="font-semibold">{scannedData.herbType?.toUpperCase() || 'HERB PRODUCT'}</span>
                      </div>
                      <Badge className="bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Tracking ID</p>
                        <p className="font-mono">{scannedData.transactionId || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Collection Date</p>
                        <p>{scannedData.timestamp ? new Date(scannedData.timestamp).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tracking Timeline */}
                <TrackingTimeline 
                  events={generateTrackingEvents(scannedData)}
                  productInfo={{
                    herbType: scannedData.herbType,
                    quantity: scannedData.quantity,
                    quality: scannedData.quality,
                    transactionId: scannedData.transactionId,
                    blockchainHash: scannedData.blockchainHash
                  }}
                />

                {/* Location Map */}
                {(scannedData.location || scannedData.coordinates) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Origin Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {scannedData.locationAddress && (
                        <p className="text-sm text-muted-foreground mb-4">
                          <strong>Farm Address:</strong> {scannedData.locationAddress}
                        </p>
                      )}
                      <MapComponent 
                        locations={[{
                          lat: scannedData.coordinates ? scannedData.coordinates.lat : parseFloat(scannedData.location.split(',')[0]),
                          lng: scannedData.coordinates ? scannedData.coordinates.lng : parseFloat(scannedData.location.split(',')[1]),
                          title: `${scannedData.herbType || 'Herb'} Collection Site`,
                          description: `Collected on ${scannedData.collectionDate ? new Date(scannedData.collectionDate).toLocaleDateString() : (scannedData.timestamp ? new Date(scannedData.timestamp).toLocaleDateString() : 'Unknown date')}`
                        }]}
                        height="250px"
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Scan QR Code for Product Tracking</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Scan className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground mb-4">
                    Scan any blockchain-verified herb product QR code to track its complete journey.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>Collection Details</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>Shipping Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Quality Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Origin Tracking</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};