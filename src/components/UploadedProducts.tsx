import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Package, Star, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { QRGenerator } from "@/components/QRGenerator";

interface HerbCollection {
  id: string;
  herb_type: string;
  quantity: number;
  quality_grade: string;
  collection_date: string;
  location_address: string;
  status: string;
  transaction_id: string;
  blockchain_hash: string;
}

export const UploadedProducts = () => {
  const [products, setProducts] = useState<HerbCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<HerbCollection | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchUploadedProducts();
  }, [user]);

  const fetchUploadedProducts = async () => {
    console.log('Fetching products, user:', user);
    if (!user) {
      console.log('No user found, cannot fetch products');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Making Supabase query for user:', user.id);
      const { data, error } = await supabase
        .from('herb_collections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQRData = (product: HerbCollection) => {
    return JSON.stringify({
      transactionId: product.transaction_id,
      blockchainHash: product.blockchain_hash,
      herbType: product.herb_type,
      quantity: product.quantity,
      quality: product.quality_grade,
      location: product.location_address,
      timestamp: product.collection_date
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Your Uploaded Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-4/5"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (selectedProduct) {
    const qrData = generateQRData(selectedProduct);
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedProduct(null)}>
            ← Back to Products
          </Button>
          <h3 className="text-2xl font-bold text-foreground">
            {selectedProduct.herb_type} Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Herb Type</p>
                  <p className="font-semibold text-foreground">{selectedProduct.herb_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-semibold text-foreground">{selectedProduct.quantity} kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quality</p>
                  <Badge variant="secondary">{selectedProduct.quality_grade}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline">{selectedProduct.status}</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="text-xs font-mono bg-muted p-2 rounded text-foreground">
                  {selectedProduct.transaction_id}
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Blockchain Hash</p>
                <p className="text-xs font-mono bg-muted p-2 rounded text-foreground">
                  {selectedProduct.blockchain_hash}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <QRGenerator 
              data={qrData}
              title="Product QR Code"
              size={250}
              showBarcode={true}
              productInfo={{
                herbType: selectedProduct.herb_type,
                quantity: selectedProduct.quantity.toString(),
                quality: selectedProduct.quality_grade,
                transactionId: selectedProduct.transaction_id,
                collectionDate: selectedProduct.collection_date
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Your Uploaded Products</h3>
        <Badge variant="outline" className="text-foreground">
          {products.length} Products
        </Badge>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products uploaded yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Upload your first herb collection above to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground capitalize">
                    {product.herb_type}
                  </CardTitle>
                  <Badge 
                    variant={product.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {product.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-semibold text-foreground">{product.quantity} kg</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Quality:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-herb-gold" />
                    <span className="text-foreground capitalize">{product.quality_grade}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(product.collection_date).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {product.location_address || 'Location recorded'}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details & QR
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};