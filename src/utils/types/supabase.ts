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
      connections: {
        Row: {
          connection_id: string
          created_at: string
          list_id: string
          profile_id: string
        }
        Insert: {
          connection_id: string
          created_at?: string
          list_id: string
          profile_id: string
        }
        Update: {
          connection_id?: string
          created_at?: string
          list_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_list_id_fkey"
            columns: ["list_id"]
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "list_participants_list_id_fkey"
            columns: ["list_id"]
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "list_participants_participant_id_fkey"
            columns: ["participant_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      lists: {
        Row: {
          created_at: string
          host_id: string
          id: string
          list_name: string | null
          list_num: number
          short_id: string
        }
        Insert: {
          created_at?: string
          host_id: string
          id?: string
          list_name?: string | null
          list_num?: number
          short_id: string
        }
        Update: {
          created_at?: string
          host_id?: string
          id?: string
          list_name?: string | null
          list_num?: number
          short_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lists_host_id_fkey"
            columns: ["host_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          linked_in: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          linked_in?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          linked_in?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
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
      get_list_from_short_id: {
        Args: {
          shortid: string
        }
        Returns: Record<string, unknown>
      }
      get_list_participants: {
        Args: {
          list_id_param: string
          profile_id_param: string
        }
        Returns: {
          list_id: string
          participant_id: string
          full_name: string
          avatar_url: string
          created_at: string
          connection: boolean
        }[]
      }
      get_list_participants_with_connections: {
        Args: {
          list_id_param: string
          profile_id_param: string
        }
        Returns: Record<string, unknown>
      }
      get_short_list_id: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
      }
      is_list_host: {
        Args: {
          list_id: string
          host_id: string
        }
        Returns: boolean
      }
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
