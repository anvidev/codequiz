import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getAuthSession();

  if (!session?.user) redirect("/");

  return <div>dashboard</div>;
}
