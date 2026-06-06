export type OrderStatus = "pending" | "paid" | "dispatched" | "delivered" | "cancelled";

export interface Database {
  public: {
    Views:          Record<string, never>;
    Functions:      Record<string, never>;
    Enums:          Record<string, never>;
    CompositeTypes: Record<string, never>;
    Tables: {
      orders: {
        Row: {
          id: string;
          created_at: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          delivery_address: string;
          status: OrderStatus;
          total: number;
          mpesa_ref: string | null;
          notes: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: number;
          product_name: string;
          price: number;
          quantity: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["newsletter_subscribers"]["Row"], "id" | "created_at">;
        Update: never;
      };
    };
  };
}
