-- Create herb collections table
CREATE TABLE public.herb_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  herb_type TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  location_lat DECIMAL(10,7),
  location_lng DECIMAL(10,7),
  location_address TEXT,
  quality_grade TEXT NOT NULL,
  collection_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blockchain_hash TEXT,
  transaction_id TEXT,
  photos TEXT[],
  documents TEXT[],
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create supply chain events table
CREATE TABLE public.supply_chain_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES public.herb_collections(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  location_address TEXT,
  location_lat DECIMAL(10,7),
  location_lng DECIMAL(10,7),
  performed_by TEXT,
  status TEXT NOT NULL,
  metadata JSONB,
  blockchain_hash TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lab test results table
CREATE TABLE public.lab_test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES public.herb_collections(id) ON DELETE CASCADE,
  purity_percentage DECIMAL(5,2),
  moisture_percentage DECIMAL(5,2),
  pesticides_detected BOOLEAN DEFAULT false,
  pesticide_details TEXT,
  test_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  lab_name TEXT NOT NULL,
  lab_certificate TEXT,
  blockchain_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create batch tracking table
CREATE TABLE public.batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id TEXT UNIQUE NOT NULL,
  product_name TEXT NOT NULL,
  collection_ids UUID[],
  qr_code_data TEXT,
  packaging_date TIMESTAMP WITH TIME ZONE,
  expiry_date TIMESTAMP WITH TIME ZONE,
  certifications TEXT[],
  blockchain_hash TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.herb_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supply_chain_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for herb_collections
CREATE POLICY "Users can view their own collections" ON public.herb_collections
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own collections" ON public.herb_collections
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own collections" ON public.herb_collections
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for supply_chain_events  
CREATE POLICY "Users can view events for their collections" ON public.supply_chain_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.herb_collections 
      WHERE id = supply_chain_events.collection_id 
      AND user_id = auth.uid()
    )
  );

-- RLS Policies for lab_test_results
CREATE POLICY "Users can view test results for their collections" ON public.lab_test_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.herb_collections 
      WHERE id = lab_test_results.collection_id 
      AND user_id = auth.uid()
    )
  );

-- RLS Policies for batches (public read access for QR scanning)
CREATE POLICY "Batches are publicly viewable" ON public.batches
  FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_herb_collections_user_id ON public.herb_collections(user_id);
CREATE INDEX idx_supply_chain_events_collection_id ON public.supply_chain_events(collection_id);
CREATE INDEX idx_lab_test_results_collection_id ON public.lab_test_results(collection_id);
CREATE INDEX idx_batches_batch_id ON public.batches(batch_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_herb_collections_updated_at
  BEFORE UPDATE ON public.herb_collections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();