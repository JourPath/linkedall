export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      config: {
        Row: {
          created_at: string;
          id: string;
          subscriptions: Json;
        };
        Insert: {
          created_at?: string;
          id?: string;
          subscriptions?: Json;
        };
        Update: {
          created_at?: string;
          id?: string;
          subscriptions?: Json;
        };
        Relationships: [];
      };
      connections: {
        Row: {
          connection_id: string;
          created_at: string;
          list_id: string;
          profile_id: string;
        };
        Insert: {
          connection_id: string;
          created_at?: string;
          list_id: string;
          profile_id: string;
        };
        Update: {
          connection_id?: string;
          created_at?: string;
          list_id?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "connections_connection_id_fkey";
            columns: ["connection_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "connections_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "connections_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          id: string;
          interval: string | null;
          plan: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          interval?: string | null;
          plan?: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          interval?: string | null;
          plan?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      list_participants: {
        Row: {
          created_at: string;
          list_id: string;
          participant_id: string;
        };
        Insert: {
          created_at?: string;
          list_id: string;
          participant_id: string;
        };
        Update: {
          created_at?: string;
          list_id?: string;
          participant_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "list_participants_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "list_participants_participant_id_fkey";
            columns: ["participant_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      lists: {
        Row: {
          created_at: string;
          host_id: string;
          id: string;
          list_name: string | null;
          list_num: number;
          short_id: string | null;
        };
        Insert: {
          created_at?: string;
          host_id: string;
          id?: string;
          list_name?: string | null;
          list_num?: number;
          short_id?: string | null;
        };
        Update: {
          created_at?: string;
          host_id?: string;
          id?: string;
          list_name?: string | null;
          list_num?: number;
          short_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lists_host_id_fkey";
            columns: ["host_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string;
          full_name: string | null;
          id: string;
          linked_in: string | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string;
          full_name?: string | null;
          id: string;
          linked_in?: string | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string;
          full_name?: string | null;
          id?: string;
          linked_in?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_list_add_user: {
        Args: {
          a_list_id: string;
        };
        Returns: boolean;
      };
      can_user_host_list: {
        Args: {
          a_user_id: string;
        };
        Returns: boolean;
      };
      can_user_join_list: {
        Args: {
          a_user_id: string;
        };
        Returns: boolean;
      };
      get_list_from_short_id: {
        Args: {
          shortid: string;
        };
        Returns: {
          id: string;
          created_at: string;
          host_id: string;
          list_name: string;
          list_num: number;
          short_id: string;
        }[];
      };
      get_list_participants: {
        Args: {
          list_id_param: string;
          profile_id_param: string;
        };
        Returns: {
          list_id: string;
          participant_id: string;
          full_name: string;
          avatar_url: string;
          linked_in: string;
          bio: string;
          created_at: string;
          connection: boolean;
        }[];
      };
      get_list_participants_with_connections: {
        Args: {
          list_id_param: string;
          profile_id_param: string;
        };
        Returns: Record<string, unknown>;
      };
      get_short_list_id: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>;
      };
      is_list_host: {
        Args: {
          list_id: string;
          host_id: string;
        };
        Returns: boolean;
      };
      is_list_participant: {
        Args: {
          list_id: string;
          participant_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
