import Form from "next/form";

import { signup } from "./actions";

import Button from "@/components/button";

export default function SignUpPage() {
  return (
    <article>
      <section>
        <Form action={signup}>
          <h2>Sign Up</h2>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <br />
          <Button type="submit">Sign up</Button>
        </Form>
      </section>
    </article>
  );
}
