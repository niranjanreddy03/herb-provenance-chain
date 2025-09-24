import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Camera, Upload, CheckCircle, Package, Plus } from "lucide-react";
import { useState } from "react";
import mobileApp from "@/assets/mobile-app.jpg";
import { supabase } from "@/integrations/supabase/client";
import { QRGenerator } from "@/components/QRGenerator";
import { MapComponent } from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";
import { UploadedProducts } from "@/components/UploadedProducts";

export const FarmerInterface = () => {
  const [collectionData, setCollectionData] = useState({
    herb: "",
    location: "",
    quantity: "",
    quality: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txInfo, setTxInfo] = useState<{ hash: string; txId: string } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!collectionData.herb || !collectionData.quantity || !collectionData.quality) {
      console.error("Missing required fields");
      alert("Please fill all required fields");
      return;
    }
    
    console.log("Starting blockchain submission...", collectionData);
    
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke("blockchain-log", {
        body: {
          action: "collection",
          payload: {
            herb_type: collectionData.herb,
            quantity: parseFloat(collectionData.quantity || "0"),
            quality_grade: collectionData.quality,
            location_lat: 28.6139,
            location_lng: 77.2090,
            location_address: "Auto-detected",
          },
        },
      });

      console.log("Edge function response:", { data, error });

      if (error) throw error;

      setTxInfo({
        hash: data?.blockchain_hash,
        txId: data?.transaction_id,
      });
      setIsSubmitted(true);
      
      // Show success toast for QR generation
      toast({
        title: "Success!",
        description: "Herb data logged to blockchain and QR code generated",
      });
      
      setTimeout(() => setIsSubmitted(false), 3500);
    } catch (err) {
      console.error("Blockchain submission failed:", err);
      alert("Submission failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Generate QR code data with blockchain info
  const qrData = txInfo ? JSON.stringify({
    transactionId: txInfo.txId,
    blockchainHash: txInfo.hash,
    herbType: collectionData.herb,
    quantity: collectionData.quantity,
    quality: collectionData.quality,
    location: "28.6139,77.2090", // Using fixed coordinates for now
    timestamp: new Date().toISOString()
  }) : "";

  const resetForm = () => {
    setCollectionData({ herb: "", location: "", quantity: "", quality: "" });
    setIsSubmitted(false);
    setTxInfo(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Farmer Collection Interface
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering farmers with simple mobile tools to log herb collection data directly to the blockchain, ensuring transparency from the very first step.
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Upload New Product
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              My Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Mobile App Preview */}
              <div className="relative">
                <div className="relative z-10 max-w-sm mx-auto">
                  <div className="bg-gradient-to-br from-herb-green to-herb-sage p-1 rounded-3xl shadow-2xl">
                    <img
                      src={mobileApp}
                      alt="Blockchain traceability mobile app interface"
                      className="w-full rounded-3xl"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-herb-green/20 to-herb-gold/20 rounded-3xl blur-3xl transform scale-110" />
              </div>

              {/* Collection Form */}
              <div className="space-y-8">
                <Card className="shadow-lg border-herb-green/20">
                  <CardHeader className="bg-gradient-to-r from-herb-green to-herb-sage text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-6 h-6" />
                      Log Herb Collection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {isSubmitted && txInfo ? (
                      <div className="space-y-6">
                        <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-green-800 mb-2">Successfully Logged to Blockchain!</h3>
                          <div className="space-y-2 text-sm text-green-700">
                            <p><strong>Transaction ID:</strong> {txInfo.txId}</p>
                            <p><strong>Blockchain Hash:</strong> {txInfo.hash}</p>
                            <p><strong>Herb:</strong> {collectionData.herb}</p>
                            <p><strong>Quantity:</strong> {collectionData.quantity}kg</p>
                            <p><strong>Quality:</strong> {collectionData.quality}</p>
                          </div>
                        </div>

                        <QRGenerator 
                          data={qrData}
                          title="Blockchain Product Label"
                          size={300}
                          showBarcode={true}
                          productInfo={{
                            herbType: collectionData.herb,
                            quantity: collectionData.quantity,
                            quality: collectionData.quality,
                            transactionId: txInfo.txId,
                            collectionDate: new Date().toISOString()
                          }}
                        />

                        <Button onClick={resetForm} className="w-full" variant="outline">
                          Add Another Product
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="herb-type" className="text-foreground">Herb Type *</Label>
                            <Select value={collectionData.herb} onValueChange={(value) => 
                              setCollectionData(prev => ({...prev, herb: value}))
                            }>
                              <SelectTrigger className={!collectionData.herb ? "border-red-300" : ""}>
                                <SelectValue placeholder="Select herb" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ashwagandha">Ashwagandha</SelectItem>
                                <SelectItem value="turmeric">Turmeric</SelectItem>
                                <SelectItem value="brahmi">Brahmi</SelectItem>
                                <SelectItem value="neem">Neem</SelectItem>
                                <SelectItem value="giloy">Giloy</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="quantity" className="text-foreground">Quantity (kg) *</Label>
                            <Input
                              id="quantity"
                              type="number"
                              placeholder="Enter weight"
                              value={collectionData.quantity}
                              onChange={(e) => setCollectionData(prev => ({...prev, quantity: e.target.value}))}
                              className={!collectionData.quantity ? "border-red-300" : ""}
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-foreground">GPS Location</Label>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="Auto-detecting location..." 
                              value="28.6139° N, 77.2090° E"
                              readOnly
                              className="bg-muted"
                            />
                            <Button type="button" variant="outline" size="icon">
                              <MapPin className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-foreground">Quality Assessment *</Label>
                          <Select value={collectionData.quality} onValueChange={(value) => 
                            setCollectionData(prev => ({...prev, quality: value}))
                          }>
                            <SelectTrigger className={!collectionData.quality ? "border-red-300" : ""}>
                              <SelectValue placeholder="Select quality grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="premium">Premium Grade</SelectItem>
                              <SelectItem value="standard">Standard Grade</SelectItem>
                              <SelectItem value="basic">Basic Grade</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Button type="button" variant="outline" className="flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            Take Photo
                          </Button>
                          <Button type="button" variant="outline" className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload Docs
                          </Button>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-herb-green to-herb-sage">
                          {loading ? "Submitting..." : "Submit to Blockchain"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-8">
            <UploadedProducts />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};