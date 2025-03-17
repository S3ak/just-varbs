"use server";

import { createClient } from "@/lib/supabase/server";

export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  }

  return user;
};

export const signOutUser = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return null;
  }

  return "User successfully logged out";
};
