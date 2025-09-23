import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Package, Truck, Shield } from "lucide-react";

interface TrackingEvent {
  id: string;
  eventType: string;
  status: string;
  location?: string;
  timestamp: string;
  description?: string;
  performedBy?: string;
}

interface TrackingTimelineProps {
  events: TrackingEvent[];
  productInfo: {
    herbType?: string;
    quantity?: string;
    quality?: string;
    transactionId?: string;
    blockchainHash?: string;
  };
}

const getEventIcon = (eventType: string) => {
  switch (eventType) {
    case 'collection':
      return <Package className="w-4 h-4" />;
    case 'processing':
      return <Shield className="w-4 h-4" />;
    case 'packaging':
      return <Package className="w-4 h-4" />;
    case 'shipping':
      return <Truck className="w-4 h-4" />;
    case 'delivered':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-gray-400';
    default:
      return 'bg-gray-300';
  }
};

export const TrackingTimeline = ({ events, productInfo }: TrackingTimelineProps) => {
  return (
    <div className="space-y-6">
      {/* Product Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Blockchain Tracking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Product</p>
              <p className="capitalize">{productInfo.herbType || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quantity</p>
              <p>{productInfo.quantity ? `${productInfo.quantity}kg` : 'N/A'}</p>
            </div>
          </div>
          
          {productInfo.transactionId && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tracking ID</p>
              <p className="font-mono text-sm">{productInfo.transactionId}</p>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Blockchain Verified
            </Badge>
            <Badge variant="outline">
              Grade: {productInfo.quality || 'N/A'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card>
        <CardHeader>
          <CardTitle>Product Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-border"></div>
            
            {events.map((event, index) => (
              <div key={event.id} className="relative flex items-start gap-4 pb-6 last:pb-0">
                {/* Timeline dot */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-white ${getStatusColor(event.status)}`}>
                  {getEventIcon(event.eventType)}
                </div>
                
                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium capitalize">
                      {event.eventType.replace(/-/g, ' ')}
                    </h4>
                    <Badge 
                      variant={event.status === 'completed' ? 'default' : 'secondary'}
                      className={event.status === 'completed' ? 'bg-green-600' : ''}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{new Date(event.timestamp).toLocaleString()}</span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    )}
                    {event.performedBy && (
                      <span>by {event.performedBy}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};