import { Login } from "../login";
import { getUser } from "@/lib/user/user.queries";

export default async function SignInPage() {
  const user = await getUser();
  if (user) {
    console.log("user is logged in");
  }

  return <Login mode="signin" />;
}
