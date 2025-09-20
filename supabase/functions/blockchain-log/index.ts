import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomHex(len = 16): string {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase env vars");
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const body = await req.json();
    const { action, payload } = body ?? {};

    if (action !== "collection") {
      return new Response(JSON.stringify({ error: "Unsupported action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const {
      herb_type,
      quantity,
      quality_grade,
      location_lat,
      location_lng,
      location_address,
      user_id,
    } = payload || {};

    if (!herb_type || !quantity || !quality_grade) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Simulate blockchain write by hashing the payload + timestamp
    const toHash = JSON.stringify({ herb_type, quantity, quality_grade, location_lat, location_lng, ts: Date.now() });
    const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(toHash));
    const blockchain_hash = "0x" + bytesToHex(hashBuffer).slice(0, 64);
    const transaction_id = "txn_" + randomHex(12);

    const { data, error } = await supabase
      .from("herb_collections")
      .insert([
        {
          user_id: user_id ?? null,
          herb_type,
          quantity,
          quality_grade,
          location_lat: location_lat ?? null,
          location_lng: location_lng ?? null,
          location_address: location_address ?? null,
          blockchain_hash,
          transaction_id,
          status: "recorded",
        },
      ])
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("DB insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ id: data?.id, blockchain_hash, transaction_id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("blockchain-log error:", e);
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
