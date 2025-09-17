import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FarmerInterface } from "@/components/FarmerInterface";
import { ConsumerScanner } from "@/components/ConsumerScanner";
import { TraceabilityDashboard } from "@/components/TraceabilityDashboard";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="farmer">
          <FarmerInterface />
        </section>
        <section id="consumer">
          <ConsumerScanner />
        </section>
        <section id="dashboard">
          <TraceabilityDashboard />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
