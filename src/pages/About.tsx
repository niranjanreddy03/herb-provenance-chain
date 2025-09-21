import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Shield, Globe, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-herb-green to-herb-sage bg-clip-text text-transparent">
                About HerbChain
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Revolutionizing India's traditional medicine supply chain through blockchain technology, 
                ensuring authenticity, sustainability, and trust from farm to pharmacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Leaf className="w-12 h-12 mx-auto text-herb-green mb-4" />
                  <CardTitle>Sustainability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Protecting biodiversity and promoting sustainable harvesting practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield className="w-12 h-12 mx-auto text-herb-green mb-4" />
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Immutable blockchain records ensuring data integrity and authenticity.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Globe className="w-12 h-12 mx-auto text-herb-green mb-4" />
                  <CardTitle>Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete supply chain visibility from cultivation to consumer.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="w-12 h-12 mx-auto text-herb-green mb-4" />
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Empowering farmers and connecting stakeholders across the value chain.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground mb-4">
                    HerbChain is dedicated to preserving the integrity of India's rich Ayurvedic heritage 
                    while embracing modern technology. Our blockchain-based traceability system ensures 
                    that every herb in the supply chain is authentic, sustainably sourced, and properly documented.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Through geo-tagging, smart contracts, and immutable record-keeping, we create trust 
                    between farmers, manufacturers, retailers, and consumers. Our platform empowers 
                    stakeholders with real-time data and complete transparency.
                  </p>
                  <p className="text-muted-foreground">
                    By combining traditional wisdom with cutting-edge technology, HerbChain is building 
                    a more sustainable and trustworthy future for Ayurvedic medicine.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;