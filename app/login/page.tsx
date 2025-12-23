import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { createSupabaseServer } from "@/lib/supabaseServer";

export default async function LoginPage() {
  const supabase = await createSupabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main>
      <LoginForm />
    </main>
  );
}
