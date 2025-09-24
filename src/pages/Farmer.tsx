import { FarmerInterface } from "@/components/FarmerInterface";
import { Navigation } from "@/components/Navigation";

const Farmer = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <FarmerInterface />
      </main>
    </div>
  );
};

export default Farmer;