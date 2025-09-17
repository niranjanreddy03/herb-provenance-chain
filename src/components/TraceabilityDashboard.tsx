import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Package, AlertCircle, CheckCircle, MapPin } from "lucide-react";

export const TraceabilityDashboard = () => {
  const dashboardData = {
    totalBatches: 1247,
    activeFarms: 89,
    verifiedProducts: 2341,
    sustainabilityScore: 87,
    recentActivity: [
      {
        id: "ASH-001",
        herb: "Ashwagandha",
        farmer: "Rajesh Kumar",
        location: "Rajasthan",
        status: "Verified",
        date: "2024-01-22",
      },
      {
        id: "TUR-045",
        herb: "Turmeric",
        farmer: "Priya Sharma",
        location: "Karnataka",
        status: "In Transit",
        date: "2024-01-22",
      },
      {
        id: "BRA-078",
        herb: "Brahmi",
        farmer: "Anil Patel",
        location: "Gujarat",
        status: "Processing",
        date: "2024-01-21",
      },
    ],
    qualityMetrics: {
      purity: 94,
      organic: 87,
      pesticide_free: 96,
      fair_trade: 78,
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-herb-sage/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Regulatory Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time oversight of the entire Ayurvedic supply chain with blockchain-verified data and smart contract compliance monitoring.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Package className="w-8 h-8 mx-auto mb-4 text-herb-green" />
              <h3 className="text-3xl font-bold text-herb-green">{dashboardData.totalBatches.toLocaleString()}</h3>
              <p className="text-muted-foreground">Total Batches Tracked</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="w-8 h-8 mx-auto mb-4 text-herb-blue" />
              <h3 className="text-3xl font-bold text-herb-blue">{dashboardData.activeFarms}</h3>
              <p className="text-muted-foreground">Active Partner Farms</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <CheckCircle className="w-8 h-8 mx-auto mb-4 text-herb-gold" />
              <h3 className="text-3xl font-bold text-herb-gold">{dashboardData.verifiedProducts.toLocaleString()}</h3>
              <p className="text-muted-foreground">Verified Products</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-4 text-herb-sage" />
              <h3 className="text-3xl font-bold text-herb-sage">{dashboardData.sustainabilityScore}%</h3>
              <p className="text-muted-foreground">Sustainability Score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-herb-green" />
                Recent Blockchain Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-herb-green to-herb-sage flex items-center justify-center text-white font-semibold">
                      {activity.herb.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{activity.herb}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {activity.farmer} • {activity.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={activity.status === 'Verified' ? 'default' : 'secondary'}
                      className={activity.status === 'Verified' ? 'bg-herb-green' : ''}
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quality Metrics */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-herb-blue" />
                Quality Compliance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(dashboardData.qualityMetrics).map(([metric, value]) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">
                      {metric.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-bold">{value}%</span>
                  </div>
                  <Progress 
                    value={value} 
                    className="h-2"
                  />
                </div>
              ))}

              <div className="mt-6 p-4 bg-herb-green/10 rounded-lg border border-herb-green/20">
                <h4 className="font-semibold text-herb-green mb-2">Smart Contract Alerts</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-herb-green" />
                    All harvesting within approved seasons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-herb-green" />
                    No over-harvesting detected
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-herb-gold" />
                    2 batches pending lab verification
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};