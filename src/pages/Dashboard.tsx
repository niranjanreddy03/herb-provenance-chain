import { TraceabilityDashboard } from "@/components/TraceabilityDashboard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <TraceabilityDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;