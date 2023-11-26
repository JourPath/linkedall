export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      config: {
        Row: {
          created_at: string
          id: string
          subscriptions: Json
        }
        Insert: {
          created_at?: string
          id?: string
          subscriptions?: Json
        }
        Update: {
          created_at?: string
          id?: string
          subscriptions?: Json
        }
        Relationships: []
      }
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
      customers: {
        Row: {
          id: string
          interval: string | null
          plan: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          interval?: string | null
          plan?: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          interval?: string | null
          plan?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
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
      can_list_add_user: {
        Args: {
          a_list_id: string
        }
        Returns: boolean
      }
      can_user_host_list: {
        Args: {
          a_user_id: string
        }
        Returns: boolean
      }
      can_user_join_list: {
        Args: {
          a_user_id: string
        }
        Returns: boolean
      }
      get_list_from_short_id: {
        Args: {
          shortid: string
        }
        Returns: {
          id: string
          created_at: string
          host_id: string
          list_name: string
          list_num: number
          short_id: string
        }[]
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
          linked_in: string
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

