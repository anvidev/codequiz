import React from "react";
import { SignInButton } from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {}

function Welcome({}: Props) {
  return (
    <Card className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-96">
      <CardHeader>
        <CardTitle>Welcome to CodeQuiz</CardTitle>
        <CardDescription>
          CodeQuiz is a platform for developers to test their knowledge in
          various programming languages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInButton />
      </CardContent>
    </Card>
  );
}

export { Welcome };
