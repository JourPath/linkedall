export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      connections: {
        Row: {
          connection_id: string
          created_at: string
          profile_id: string
        }
        Insert: {
          connection_id: string
          created_at?: string
          profile_id: string
        }
        Update: {
          connection_id?: string
          created_at?: string
          profile_id?: string
        }
      }
      list_participants: {
        Row: {
          created_at: string
          list_id: string
          participant_id: string
        }
        Insert: {
          created_at?: string
          list_id: string
          participant_id: string
        }
        Update: {
          created_at?: string
          list_id?: string
          participant_id?: string
        }
      }
      lists: {
        Row: {
          created_at: string
          host_id: string
          id: string
          list_name: string | null
        }
        Insert: {
          created_at?: string
          host_id: string
          id?: string
          list_name?: string | null
        }
        Update: {
          created_at?: string
          host_id?: string
          id?: string
          list_name?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_list_participant: {
        Args: {
          list_id: string
          participant_id: string
        }
        Returns: boolean
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
