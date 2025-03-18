export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      matches: {
        Row: {
          _judge_name: string | null;
          _winner_name: string | null;
          completed_at: string | null;
          created_at: string;
          id: number;
          rounds: string | null;
          uuid: string | null;
        };
        Insert: {
          _judge_name?: string | null;
          _winner_name?: string | null;
          completed_at?: string | null;
          created_at?: string;
          id?: number;
          rounds?: string | null;
          uuid?: string | null;
        };
        Update: {
          _judge_name?: string | null;
          _winner_name?: string | null;
          completed_at?: string | null;
          created_at?: string;
          id?: number;
          rounds?: string | null;
          uuid?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar: string | null;
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          avatar?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      rounds: {
        Row: {
          _contestant1_name: string | null;
          _contestant2_name: string | null;
          _winner_name: string | null;
          answer1: string | null;
          answer2: string | null;
          answers: string[] | null;
          category: string | null;
          completed_at: string | null;
          created_at: string;
          current_turn: number | null;
          datetime_end: string | null;
          datetime_start: string | null;
          genre: string | null;
          id: number;
          match: string | null;
          question: string | null;
          tags: Json | null;
          total_turns: number | null;
        };
        Insert: {
          _contestant1_name?: string | null;
          _contestant2_name?: string | null;
          _winner_name?: string | null;
          answer1?: string | null;
          answer2?: string | null;
          answers?: string[] | null;
          category?: string | null;
          completed_at?: string | null;
          created_at?: string;
          current_turn?: number | null;
          datetime_end?: string | null;
          datetime_start?: string | null;
          genre?: string | null;
          id?: number;
          match?: string | null;
          question?: string | null;
          tags?: Json | null;
          total_turns?: number | null;
        };
        Update: {
          _contestant1_name?: string | null;
          _contestant2_name?: string | null;
          _winner_name?: string | null;
          answer1?: string | null;
          answer2?: string | null;
          answers?: string[] | null;
          category?: string | null;
          completed_at?: string | null;
          created_at?: string;
          current_turn?: number | null;
          datetime_end?: string | null;
          datetime_start?: string | null;
          genre?: string | null;
          id?: number;
          match?: string | null;
          question?: string | null;
          tags?: Json | null;
          total_turns?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
