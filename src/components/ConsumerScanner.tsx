import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, MapPin, Calendar, Shield, Award, Leaf } from "lucide-react";
import { useState } from "react";
import ashwagandhaTrace from "@/assets/ashwagandha-trace.jpg";

export const ConsumerScanner = () => {
  const [scannedData, setScannedData] = useState(null);

  const mockTraceabilityData = {
    productName: "Organic Ashwagandha Root Powder",
    batchId: "ASH-2024-001",
    harvestDate: "2024-01-15",
    farmLocation: "Rajasthan, India (26.9124° N, 75.7873° E)",
    farmer: "Rajesh Kumar",
    quality: "Premium Grade",
    labResults: {
      purity: "99.2%",
      moisture: "8.1%",
      pesticides: "Not Detected",
    },
    certifications: ["Organic", "Fair Trade", "Sustainable"],
    blockchainHash: "0x7f9a8b2c...4e5d6789",
    journey: [
      {
        stage: "Collection",
        date: "2024-01-15",
        location: "Organic Farm, Rajasthan",
        status: "Verified",
      },
      {
        stage: "Quality Testing",
        date: "2024-01-18",
        location: "Certified Lab, Jaipur",
        status: "Passed",
      },
      {
        stage: "Processing",
        date: "2024-01-20",
        location: "Processing Unit, Delhi",
        status: "Completed",
      },
      {
        stage: "Packaging",
        date: "2024-01-22",
        location: "Distribution Center, Mumbai",
        status: "Ready for Dispatch",
      },
    ],
  };

  const handleScan = () => {
    setScannedData(mockTraceabilityData);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-herb-sage/10 to-herb-gold/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Consumer Transparency Portal
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scan any QR code on your Ayurvedic products to see the complete journey from farm to shelf, verified by blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* QR Scanner Interface */}
          <div className="space-y-8">
            <Card className="text-center p-8 border-2 border-dashed border-herb-green/30 hover:border-herb-green/60 transition-colors">
              <CardContent className="space-y-6">
                <QrCode className="w-24 h-24 mx-auto text-herb-green" />
                <h3 className="text-2xl font-semibold">Scan QR Code</h3>
                <p className="text-muted-foreground">
                  Point your camera at the QR code on your Ayurvedic product packaging
                </p>
                <Button onClick={handleScan} size="lg" className="bg-gradient-to-r from-herb-green to-herb-sage">
                  {scannedData ? "Scan Another Product" : "Demo: Scan Ashwagandha"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-herb-green" />
                  Product Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={ashwagandhaTrace}
                  alt="Ashwagandha with traceability information"
                  className="w-full rounded-lg shadow-md"
                />
              </CardContent>
            </Card>
          </div>

          {/* Traceability Results */}
          <div className="space-y-6">
            {scannedData ? (
              <>
                <Card className="border-herb-green/20 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-herb-green to-herb-sage text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-6 h-6" />
                      {scannedData.productName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Batch ID</p>
                        <p className="font-semibold">{scannedData.batchId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quality</p>
                        <Badge variant="secondary" className="bg-herb-green/10 text-herb-green">
                          {scannedData.quality}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Origin
                      </p>
                      <p className="font-semibold">{scannedData.farmLocation}</p>
                      <p className="text-sm">Farmer: {scannedData.farmer}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Harvest Date
                      </p>
                      <p className="font-semibold">{scannedData.harvestDate}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                      <div className="flex gap-2 flex-wrap">
                        {scannedData.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="border-herb-green text-herb-green">
                            <Award className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lab Test Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Purity</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {scannedData.labResults.purity}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Moisture Content</span>
                      <Badge variant="secondary">{scannedData.labResults.moisture}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Pesticide Residue</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {scannedData.labResults.pesticides}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Supply Chain Journey</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scannedData.journey.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-3 h-3 rounded-full bg-herb-green mt-2 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{step.stage}</h4>
                                <p className="text-sm text-muted-foreground">{step.location}</p>
                              </div>
                              <div className="text-right">
                                <Badge 
                                  variant={step.status === 'Verified' || step.status === 'Passed' ? 'default' : 'secondary'}
                                  className={step.status === 'Verified' || step.status === 'Passed' ? 'bg-herb-green' : ''}
                                >
                                  {step.status}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Blockchain Verification</p>
                      <p className="font-mono text-sm break-all">{scannedData.blockchainHash}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="p-12 text-center border-dashed">
                <CardContent>
                  <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Scan</h3>
                  <p className="text-muted-foreground">
                    Scan a QR code to view complete traceability information
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