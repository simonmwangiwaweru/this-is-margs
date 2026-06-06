"use server";
import { supabase } from "@/lib/supabase";

export async function subscribeNewsletter(
  email: string
): Promise<{ success: true } | { error: string }> {
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.toLowerCase().trim() });

  if (error) {
    if (error.code === "23505") {
      return { error: "You're already subscribed!" };
    }
    console.error("Newsletter insert failed:", error);
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
