// import { redirect } from "next/navigation";
import { Login } from "../login";
import { getUser } from "@/queries/user";

export default async function SignInPage() {
  const user = await getUser();
  if (user) {
    // return redirect("/");
    console.log("user is logged in");
  }

  return <Login mode="signin" />;
}
