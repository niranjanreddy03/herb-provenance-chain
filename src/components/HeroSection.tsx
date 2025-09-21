import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Shield, MapPin, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import heroFarm from "@/assets/hero-farm.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFarm}
          alt="Ayurvedic herb farm with blockchain technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Blockchain Traceability for
            <span className="block text-transparent bg-gradient-to-r from-herb-gold to-herb-sage bg-clip-text">
              Ayurvedic Herbs
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            From farm to pharmacy - ensuring authenticity, sustainability, and trust in India's traditional medicine supply chain through blockchain technology and geo-tagging.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/farmer">
              <Button size="lg" variant="hero" className="text-lg px-8 py-4">
                Start Tracking
              </Button>
            </Link>
            <Link to="/consumer">
              <Button size="lg" variant="outline-hero" className="text-lg px-8 py-4">
                View Demo
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-4 text-herb-gold" />
                <h3 className="font-semibold mb-2">Geo-Tagged Collection</h3>
                <p className="text-sm text-gray-200">Real-time location tracking from source</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 mx-auto mb-4 text-herb-gold" />
                <h3 className="font-semibold mb-2">Blockchain Security</h3>
                <p className="text-sm text-gray-200">Immutable records on Hyperledger Fabric</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <QrCode className="w-8 h-8 mx-auto mb-4 text-herb-gold" />
                <h3 className="font-semibold mb-2">Consumer Transparency</h3>
                <p className="text-sm text-gray-200">Scan QR codes for complete provenance</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Leaf className="w-8 h-8 mx-auto mb-4 text-herb-gold" />
                <h3 className="font-semibold mb-2">Sustainability Checks</h3>
                <p className="text-sm text-gray-200">Smart contracts protect biodiversity</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};