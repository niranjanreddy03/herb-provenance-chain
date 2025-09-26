# 🌿 Herb Traceability Platform

A comprehensive blockchain-powered traceability platform for herbs and agricultural products, enabling full supply chain transparency from farm to consumer.

## ✨ Features

### 🚜 For Farmers
- **Product Registration**: Log herb collection data with GPS location, quality grades, and timestamps
- **Blockchain Integration**: Secure and immutable record-keeping on blockchain
- **QR Code Generation**: Create unique QR codes and barcodes for each product batch
- **Real-time Dashboard**: Track all uploaded products and their blockchain status
- **Photo Documentation**: Capture and store product images
- **Document Upload**: Attach certificates and compliance documents

### 🛒 For Consumers
- **QR Code Scanner**: Scan product QR codes to view complete traceability information
- **Product History**: Access detailed journey from farm to shelf
- **Quality Verification**: View quality grades and certifications
- **Location Tracking**: See exact collection locations and processing facilities
- **Authentication**: Verify product authenticity through blockchain verification

### 📊 Dashboard & Analytics
- **Traceability Timeline**: Visual representation of product journey
- **Interactive Maps**: Geographic visualization of supply chain
- **Real-time Updates**: Live tracking of product status changes
- **Comprehensive Reports**: Detailed analytics and insights

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icons

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Data security and user isolation
- **Real-time Subscriptions** - Live data updates
- **Edge Functions** - Serverless API endpoints

### Blockchain & Integrations
- **Blockchain Logging** - Immutable record storage
- **QR Code Generation** - Product identification
- **Barcode Support** - Additional product coding
- **GPS Integration** - Location tracking
- **Camera Access** - QR scanning and photo capture

### Libraries & Tools
- **QR Scanner** - Camera-based QR code reading
- **QRCode.js** - QR code generation
- **JSBarcode** - Barcode generation
- **Mapbox GL** - Interactive mapping
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Query** - Server state management

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Modern web browser with camera support (for QR scanning)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd herb-traceability-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Set up your Supabase project
   - Run the database migrations (included in `/supabase/migrations/`)
   - Configure Row Level Security policies

5. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── ConsumerScanner.tsx
│   ├── FarmerInterface.tsx
│   ├── QRGenerator.tsx
│   ├── QRScanner.tsx
│   ├── TraceabilityDashboard.tsx
│   └── ...
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
├── pages/              # Route components
└── assets/             # Static assets

supabase/
├── functions/          # Edge Functions
│   ├── blockchain-log/ # Blockchain logging API
│   └── get-product-details/ # Product data retrieval
└── migrations/         # Database migrations
```

## 🔐 Authentication

The platform uses Supabase Auth for secure user management:

- **Email/Password Authentication**
- **Row Level Security (RLS)** for data isolation
- **Session Management** with automatic token refresh
- **Protected Routes** for authenticated users only

To test authentication:
1. Navigate to `/auth`
2. Sign up with email and password
3. Access farmer or consumer portals

## 📡 API Endpoints

### Edge Functions

#### Blockchain Logging
- **Endpoint**: `/functions/v1/blockchain-log`
- **Method**: POST
- **Purpose**: Log product data to blockchain
- **Authentication**: Required

#### Product Details
- **Endpoint**: `/functions/v1/get-product-details`
- **Method**: GET
- **Purpose**: Retrieve product information
- **Authentication**: Optional

### Database Tables

- `herb_collections` - Product collection data
- `profiles` - User profile information (if implemented)

## 🎯 Usage Guide

### For Farmers

1. **Sign up/Login** at `/auth`
2. **Navigate to Farmer Portal** at `/farmer`
3. **Upload Product Data**:
   - Select herb type and enter quantity
   - Allow GPS location access
   - Assess quality grade
   - Take product photos
   - Submit to blockchain
4. **Generate QR Codes** for product labeling
5. **Track Products** in "My Products" section

### For Consumers

1. **Visit Consumer Portal** at `/consumer`
2. **Scan QR Code**:
   - Allow camera access
   - Point camera at product QR code
   - View detailed product information
3. **Verify Authenticity** through blockchain data
4. **Explore Supply Chain** timeline and locations

## 🚀 Deployment

### Lovable Platform (Recommended)
1. Connect your GitHub repository to Lovable
2. Click "Publish" in the Lovable editor
3. Your app will be deployed automatically

### Manual Deployment
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**:
   - Vercel
   - Netlify
   - AWS Amplify
   - Or any static hosting service

3. **Configure environment variables** on your hosting platform

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the included migrations
3. Configure authentication providers
4. Set up storage buckets for images
5. Deploy Edge Functions

### Environment Variables
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use the existing component patterns
- Maintain responsive design
- Test on mobile devices for QR scanning
- Follow the established code style

## 🐛 Troubleshooting

### Common Issues

**Camera not working on mobile**
- Ensure HTTPS is enabled
- Check browser permissions
- Test on different browsers

**QR codes not generating**
- Verify product data is complete
- Check blockchain logging status
- Ensure user is authenticated

**Authentication issues**
- Verify Supabase configuration
- Check environment variables
- Clear browser storage and retry

## 📱 Mobile Compatibility

The platform is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Camera access for QR scanning
- Optimized forms for mobile input
- Progressive Web App (PWA) ready

## 🔒 Security Features

- **Row Level Security (RLS)** on all database tables
- **User data isolation** through authentication
- **Secure API endpoints** with proper validation
- **Blockchain immutability** for tamper-proof records
- **Input validation** and sanitization

## 📈 Performance

- **Vite** for fast development and builds
- **Code splitting** for optimal loading
- **Image optimization** for mobile performance
- **Real-time updates** without polling
- **Efficient state management**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Powered by [Supabase](https://supabase.com)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the documentation
- Contact the development team

---

**Made with ❤️ for sustainable agriculture and supply chain transparency**