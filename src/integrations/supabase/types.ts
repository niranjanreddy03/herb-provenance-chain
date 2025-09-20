export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      batches: {
        Row: {
          batch_id: string
          blockchain_hash: string | null
          certifications: string[] | null
          collection_ids: string[] | null
          created_at: string
          expiry_date: string | null
          id: string
          packaging_date: string | null
          product_name: string
          qr_code_data: string | null
          status: string | null
        }
        Insert: {
          batch_id: string
          blockchain_hash?: string | null
          certifications?: string[] | null
          collection_ids?: string[] | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          packaging_date?: string | null
          product_name: string
          qr_code_data?: string | null
          status?: string | null
        }
        Update: {
          batch_id?: string
          blockchain_hash?: string | null
          certifications?: string[] | null
          collection_ids?: string[] | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          packaging_date?: string | null
          product_name?: string
          qr_code_data?: string | null
          status?: string | null
        }
        Relationships: []
      }
      herb_collections: {
        Row: {
          blockchain_hash: string | null
          collection_date: string
          created_at: string
          documents: string[] | null
          herb_type: string
          id: string
          location_address: string | null
          location_lat: number | null
          location_lng: number | null
          photos: string[] | null
          quality_grade: string
          quantity: number
          status: string | null
          transaction_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          blockchain_hash?: string | null
          collection_date?: string
          created_at?: string
          documents?: string[] | null
          herb_type: string
          id?: string
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          photos?: string[] | null
          quality_grade: string
          quantity: number
          status?: string | null
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          blockchain_hash?: string | null
          collection_date?: string
          created_at?: string
          documents?: string[] | null
          herb_type?: string
          id?: string
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          photos?: string[] | null
          quality_grade?: string
          quantity?: number
          status?: string | null
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      lab_test_results: {
        Row: {
          blockchain_hash: string | null
          collection_id: string | null
          created_at: string
          id: string
          lab_certificate: string | null
          lab_name: string
          moisture_percentage: number | null
          pesticide_details: string | null
          pesticides_detected: boolean | null
          purity_percentage: number | null
          test_date: string
        }
        Insert: {
          blockchain_hash?: string | null
          collection_id?: string | null
          created_at?: string
          id?: string
          lab_certificate?: string | null
          lab_name: string
          moisture_percentage?: number | null
          pesticide_details?: string | null
          pesticides_detected?: boolean | null
          purity_percentage?: number | null
          test_date?: string
        }
        Update: {
          blockchain_hash?: string | null
          collection_id?: string | null
          created_at?: string
          id?: string
          lab_certificate?: string | null
          lab_name?: string
          moisture_percentage?: number | null
          pesticide_details?: string | null
          pesticides_detected?: boolean | null
          purity_percentage?: number | null
          test_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_test_results_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "herb_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      supply_chain_events: {
        Row: {
          blockchain_hash: string | null
          collection_id: string | null
          created_at: string
          event_date: string
          event_type: string
          id: string
          location_address: string | null
          location_lat: number | null
          location_lng: number | null
          metadata: Json | null
          performed_by: string | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          blockchain_hash?: string | null
          collection_id?: string | null
          created_at?: string
          event_date?: string
          event_type: string
          id?: string
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          metadata?: Json | null
          performed_by?: string | null
          status: string
          transaction_id?: string | null
        }
        Update: {
          blockchain_hash?: string | null
          collection_id?: string | null
          created_at?: string
          event_date?: string
          event_type?: string
          id?: string
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          metadata?: Json | null
          performed_by?: string | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supply_chain_events_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "herb_collections"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
