import { ConsumerScanner } from "@/components/ConsumerScanner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Consumer = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <ConsumerScanner />
      </main>
      <Footer />
    </div>
  );
};

export default Consumer;