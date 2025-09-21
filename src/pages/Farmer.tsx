import { FarmerInterface } from "@/components/FarmerInterface";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Farmer = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <FarmerInterface />
      </main>
      <Footer />
    </div>
  );
};

export default Farmer;