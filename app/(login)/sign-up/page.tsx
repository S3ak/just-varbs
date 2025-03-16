import { getUser, signOutUser } from "@/queries/user";
import { Login } from "../login";

export default async function SignUpPage() {
  const user = await getUser();
  if (user) {
    await signOutUser();
  }

  return <Login mode="signup" />;
}
