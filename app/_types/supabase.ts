export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      event_tags: {
        Row: {
          event_id: number
          tag_id: number
        }
        Insert: {
          event_id: number
          tag_id: number
        }
        Update: {
          event_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_tags_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string
          external_url: string | null
          fee_pln: number | null
          id: number
          is_cancelled: boolean
          latitude: number | null
          location: string | null
          longitude: number | null
          max_attendees: number | null
          name: string
          organizer_slug: string
          share_code: string | null
          signups_end_at: string | null
          starts_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          external_url?: string | null
          fee_pln?: number | null
          id?: number
          is_cancelled?: boolean
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_attendees?: number | null
          name: string
          organizer_slug: string
          share_code?: string | null
          signups_end_at?: string | null
          starts_at: string
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          external_url?: string | null
          fee_pln?: number | null
          id?: number
          is_cancelled?: boolean
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_attendees?: number | null
          name?: string
          organizer_slug?: string
          share_code?: string | null
          signups_end_at?: string | null
          starts_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_slug_fkey"
            columns: ["organizer_slug"]
            isOneToOne: false
            referencedRelation: "organizers"
            referencedColumns: ["slug"]
          },
        ]
      }
      organizers: {
        Row: {
          contact_email: string | null
          official_url: string | null
          description: string | null
          is_approved: boolean
          name: string
          slug: string
          user_id: string | null
        }
        Insert: {
          contact_email?: string | null
          official_url?: string | null
          description?: string | null
          is_approved?: boolean
          name: string
          slug: string
          user_id?: string | null
        }
        Update: {
          contact_email?: string | null
          official_url?: string | null
          description?: string | null
          is_approved?: boolean
          name?: string
          slug?: string
          user_id?: string | null
        }
        Relationships: []
      }
      organizers_protected: {
        Row: {
          account_number: string | null
          organizer_slug: string
        }
        Insert: {
          account_number?: string | null
          organizer_slug: string
        }
        Update: {
          account_number?: string | null
          organizer_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizers_protected_organizer_slug_fkey"
            columns: ["organizer_slug"]
            isOneToOne: true
            referencedRelation: "organizers"
            referencedColumns: ["slug"]
          },
        ]
      }
      signups: {
        Row: {
          attendee_id: string
          created_at: string
          event_id: number
          id: string
          is_cancelled: boolean
          payment_id: string | null
          payment_status: number | null
        }
        Insert: {
          attendee_id: string
          created_at?: string
          event_id: number
          id?: string
          is_cancelled?: boolean
          payment_id?: string | null
          payment_status?: number | null
        }
        Update: {
          attendee_id?: string
          created_at?: string
          event_id?: number
          id?: string
          is_cancelled?: boolean
          payment_id?: string | null
          payment_status?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "signups_attendee_id_fkey"
            columns: ["attendee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          company_city: string | null
          company_name: string | null
          company_nip: string | null
          company_postal_code: string | null
          company_street: string | null
          id: string
          last_name: string | null
          name: string | null
          phone: string | null
        }
        Insert: {
          company_city?: string | null
          company_name?: string | null
          company_nip?: string | null
          company_postal_code?: string | null
          company_street?: string | null
          id: string
          last_name?: string | null
          name?: string | null
          phone?: string | null
        }
        Update: {
          company_city?: string | null
          company_name?: string | null
          company_nip?: string | null
          company_postal_code?: string | null
          company_street?: string | null
          id?: string
          last_name?: string | null
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_clean_slug: {
        Args: {
          slug: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
