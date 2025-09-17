import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Camera, Upload, CheckCircle } from "lucide-react";
import { useState } from "react";
import mobileApp from "@/assets/mobile-app.jpg";

export const FarmerInterface = () => {
  const [collectionData, setCollectionData] = useState({
    herb: "",
    location: "",
    quantity: "",
    quality: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
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
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 mx-auto text-herb-green mb-4" />
                    <h3 className="text-2xl font-semibold text-herb-green mb-2">
                      Collection Recorded!
                    </h3>
                    <p className="text-muted-foreground">
                      Data successfully added to blockchain with timestamp: {new Date().toLocaleString()}
                    </p>
                    <div className="bg-herb-green/10 rounded-lg p-4 mt-4">
                      <p className="text-sm font-mono">
                        Block Hash: 0x7a8b...4c2d
                      </p>
                      <p className="text-sm font-mono">
                        Transaction ID: txn_789...xyz
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="herb-type">Herb Type</Label>
                        <Select value={collectionData.herb} onValueChange={(value) => 
                          setCollectionData(prev => ({...prev, herb: value}))
                        }>
                          <SelectTrigger>
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
                        <Label htmlFor="quantity">Quantity (kg)</Label>
                        <Input
                          id="quantity"
                          type="number"
                          placeholder="Enter weight"
                          value={collectionData.quantity}
                          onChange={(e) => setCollectionData(prev => ({...prev, quantity: e.target.value}))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>GPS Location</Label>
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
                      <Label>Quality Assessment</Label>
                      <Select value={collectionData.quality} onValueChange={(value) => 
                        setCollectionData(prev => ({...prev, quality: value}))
                      }>
                        <SelectTrigger>
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

                    <Button type="submit" className="w-full bg-gradient-to-r from-herb-green to-herb-sage">
                      Submit to Blockchain
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};