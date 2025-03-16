"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { signInWithEmail, signUpWithEmail } from "./actions";
import Button from "@/components/button";
import Form from "next/form";

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center">LOGO</div>

        <h1 className="mt-10 text-2xl font-semibold tracking-tight text-center text-gray-900">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {mode === "signin"
            ? "Sign in to continue to your account"
            : "Get started with your new account"}
        </p>

        {mode === "signin" ? (
          <Form action={signInWithEmail}>
            <p>Sign In</p>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <br />
            <Button type="submit">Log in</Button>
          </Form>
        ) : (
          <Form action={signUpWithEmail}>
            <p>Sign Up</p>
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
        )}
        <div className="mt-10">
          <div className="space-y-6">
            <div className="relative">
              <div className="flex absolute inset-0 items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="flex relative justify-center">
                <span className="px-4 text-sm text-gray-500 bg-gradient-to-b from-white to-gray-50">
                  or
                </span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-center text-gray-600">
            {mode === "signin"
              ? "New to our platform? "
              : "Already have an account? "}
            <Link
              href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
                redirect ? `?redirect=${redirect}` : ""
              }`}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
