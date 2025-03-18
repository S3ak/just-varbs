import AccountForm from "./account-form";
import { createClient } from "@/lib/supabase/server";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  debugger;

  console.log("account page user", user);

  return <AccountForm user={user} />;
}
