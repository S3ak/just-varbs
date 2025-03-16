import Form from "next/form";

import { login, signup } from "./actions";

import Button from "@components/button";

export default function LoginPage() {
  return (
    <article>
      <section>
        <Form action={login}>
          <h2>Sign In</h2>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <br />
          <Button type="submit">Log in</Button>
        </Form>

        <Form action={signup}>
          <h2>Sign Up</h2>
          <label htmlFor="email">Email:</label>
          <input id="register-email" name="email" type="email" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            id="register-password"
            name="password"
            type="password"
            required
          />
          <br />
          <Button type="submit">Sign Up</Button>
        </Form>
      </section>
    </article>
  );
}
