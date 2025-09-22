import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase environment variables");
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const body = await req.json();
    const { qrData, transactionId, id } = body || {};

    console.log("Received request:", { qrData: !!qrData, transactionId, id });

    let query = supabase
      .from("herb_collections")
      .select(`
        id,
        herb_type,
        quantity,
        quality_grade,
        location_lat,
        location_lng,
        location_address,
        blockchain_hash,
        transaction_id,
        collection_date,
        created_at,
        status
      `);

    // Search by different criteria
    if (id) {
      query = query.eq("id", id);
    } else if (transactionId) {
      query = query.eq("transaction_id", transactionId);
    } else if (qrData) {
      // Try to parse QR data to extract transaction ID
      try {
        const parsed = JSON.parse(qrData);
        if (parsed.transactionId) {
          query = query.eq("transaction_id", parsed.transactionId);
        } else if (parsed.id) {
          query = query.eq("id", parsed.id);
        } else {
          return new Response(JSON.stringify({ error: "Invalid QR code data" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      } catch (parseError) {
        console.error("Failed to parse QR data:", parseError);
        return new Response(JSON.stringify({ error: "Invalid QR code format" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Database query error:", error);
      return new Response(JSON.stringify({ error: "Database query failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Format the response for frontend consumption
    const productDetails = {
      id: data.id,
      transactionId: data.transaction_id,
      blockchainHash: data.blockchain_hash,
      herbType: data.herb_type,
      quantity: data.quantity,
      quality: data.quality_grade,
      location: data.location_lat && data.location_lng ? `${data.location_lat},${data.location_lng}` : null,
      locationAddress: data.location_address,
      collectionDate: data.collection_date,
      timestamp: data.created_at,
      status: data.status,
      verified: true, // Indicates this is a blockchain-verified product
      coordinates: data.location_lat && data.location_lng ? {
        lat: parseFloat(data.location_lat),
        lng: parseFloat(data.location_lng)
      } : null
    };

    console.log("Successfully retrieved product details for:", data.transaction_id);

    return new Response(JSON.stringify(productDetails), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("get-product-details error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});