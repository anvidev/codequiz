import { SignInButton } from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-96">
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
    </main>
  );
}
