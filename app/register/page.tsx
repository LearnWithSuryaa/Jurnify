import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabaseServer";
import RegisterForm from "./RegisterForm";

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
      <RegisterForm />
    </main>
  );
}
