import { getUser, signOutUser } from "@/lib/user/user.queries";
import { Login } from "../login";

export default async function SignUpPage() {
  const user = await getUser();
  if (user) {
    await signOutUser();
  }

  return <Login mode="signup" />;
}
