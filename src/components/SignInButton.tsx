"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

type Props = {};

function SignInButton({}: Props) {
  return (
    <Button size="sm" onClick={() => signIn("google")}>
      Sign in
    </Button>
  );
}

export { SignInButton };
