import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, QrCode as QrCodeIcon, Printer, Package, BarChart3 } from "lucide-react";

interface QRGeneratorProps {
  data: string;
  title?: string;
  size?: number;
  showBarcode?: boolean;
  productInfo?: {
    herbType?: string;
    quantity?: string;
    quality?: string;
    transactionId?: string;
    collectionDate?: string;
  };
}

export const QRGenerator = ({ data, title = "QR Code", size = 200, showBarcode = false, productInfo }: QRGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [barcodeUrl, setBarcodeUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'qr' | 'barcode'>('qr');
  const barcodeCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (data) {
      generateQRCode();
      if (showBarcode && productInfo?.transactionId) {
        generateBarcode();
      }
    }
  }, [data, showBarcode, productInfo?.transactionId]);

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(data, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const generateBarcode = () => {
    if (barcodeCanvasRef.current && productInfo?.transactionId) {
      try {
        JsBarcode(barcodeCanvasRef.current, productInfo.transactionId, {
          format: "CODE128",
          width: 2,
          height: 80,
          displayValue: true,
          fontSize: 12,
          margin: 10
        });
        setBarcodeUrl(barcodeCanvasRef.current.toDataURL());
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    }
  };

  const downloadCode = () => {
    const currentUrl = activeTab === 'qr' ? qrCodeUrl : barcodeUrl;
    if (currentUrl) {
      const link = document.createElement('a');
      link.download = `${title.replace(/\s+/g, '_')}_${activeTab.toUpperCase()}.png`;
      link.href = currentUrl;
      link.click();
    }
  };

  const printShippingLabel = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const currentUrl = activeTab === 'qr' ? qrCodeUrl : barcodeUrl;
      const codeType = activeTab === 'qr' ? 'QR Code' : 'Barcode';
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Blockchain Product Label</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .label { border: 2px solid #000; padding: 20px; max-width: 400px; }
              .header { text-align: center; font-weight: bold; margin-bottom: 15px; }
              .code-section { text-align: center; margin: 15px 0; }
              .product-info { margin: 10px 0; }
              .product-info div { margin: 5px 0; }
              .blockchain-hash { font-size: 8px; word-break: break-all; }
            </style>
          </head>
          <body>
            <div class="label">
              <div class="header">
                <h2>🌿 BLOCKCHAIN VERIFIED HERBS</h2>
                <p>Traceable • Transparent • Trusted</p>
              </div>
              
              <div class="code-section">
                <img src="${currentUrl}" alt="${codeType}" style="max-width: 200px; height: auto;" />
                <p><strong>Scan for Full Traceability</strong></p>
                <p><small>${codeType}</small></p>
              </div>

              <div class="product-info">
                ${productInfo?.herbType ? `<div><strong>Herb:</strong> ${productInfo.herbType.charAt(0).toUpperCase() + productInfo.herbType.slice(1)}</div>` : ''}
                ${productInfo?.quantity ? `<div><strong>Quantity:</strong> ${productInfo.quantity}kg</div>` : ''}
                ${productInfo?.quality ? `<div><strong>Grade:</strong> ${productInfo.quality.charAt(0).toUpperCase() + productInfo.quality.slice(1)}</div>` : ''}
                ${productInfo?.collectionDate ? `<div><strong>Collected:</strong> ${new Date(productInfo.collectionDate).toLocaleDateString()}</div>` : ''}
                ${productInfo?.transactionId ? `<div><strong>TX ID:</strong> ${productInfo.transactionId}</div>` : ''}
              </div>

              <div style="margin-top: 20px; text-align: center; font-size: 12px;">
                <p><strong>Blockchain-verified authenticity</strong></p>
                <p>Visit our portal to track this product's journey</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCodeIcon className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          No data provided for QR code generation
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCodeIcon className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {(qrCodeUrl || barcodeUrl) && (
          <div className="space-y-4">
            {/* Tab switcher for QR/Barcode */}
            {showBarcode && barcodeUrl && (
              <div className="flex justify-center gap-2 mb-4">
                <Button
                  variant={activeTab === 'qr' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('qr')}
                  className="flex items-center gap-1"
                >
                  <QrCodeIcon className="w-4 h-4" />
                  QR Code
                </Button>
                <Button
                  variant={activeTab === 'barcode' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('barcode')}
                  className="flex items-center gap-1"
                >
                  <BarChart3 className="w-4 h-4" />
                  Barcode
                </Button>
              </div>
            )}
            
            {/* Professional shipping label style display */}
            <div className="border-2 border-primary/20 rounded-lg p-4 bg-background">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">Blockchain Verified Product</span>
              </div>
              
              {/* Code display */}
              <div className="mb-3">
                {activeTab === 'qr' && qrCodeUrl && (
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="mx-auto border border-border rounded-lg"
                  />
                )}
                {activeTab === 'barcode' && barcodeUrl && (
                  <img 
                    src={barcodeUrl} 
                    alt="Barcode" 
                    className="mx-auto border border-border rounded-lg"
                  />
                )}
              </div>
              
              {productInfo && (
                <div className="text-sm space-y-1 text-left bg-muted/50 p-3 rounded">
                  {productInfo.herbType && (
                    <div><strong>Herb:</strong> {productInfo.herbType.charAt(0).toUpperCase() + productInfo.herbType.slice(1)}</div>
                  )}
                  {productInfo.quantity && (
                    <div><strong>Quantity:</strong> {productInfo.quantity}kg</div>
                  )}
                  {productInfo.quality && (
                    <div><strong>Grade:</strong> {productInfo.quality.charAt(0).toUpperCase() + productInfo.quality.slice(1)}</div>
                  )}
                  {productInfo.transactionId && (
                    <div><strong>TX ID:</strong> <span className="font-mono text-xs">{productInfo.transactionId}</span></div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button onClick={downloadCode} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download {activeTab === 'qr' ? 'QR' : 'Barcode'}
              </Button>
              <Button onClick={printShippingLabel} variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                Print Label
              </Button>
            </div>
          </div>
        )}
        
        {/* Hidden canvas for barcode generation */}
        <canvas ref={barcodeCanvasRef} style={{ display: 'none' }} />
      </CardContent>
    </Card>
  );
};