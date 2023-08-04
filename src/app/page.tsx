import { Welcome } from "@/components/Welcome";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="px-4 py-3">
      <Welcome />
    </main>
  );
}
