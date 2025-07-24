// app/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("auth-token"); // Replace with your auth cookie/token logic
  if (isLoggedIn) {
    redirect("/main/dashboard"); // Redirect to main if logged in
  } else {
    redirect("/auth/login"); // Redirect to auth if not logged in
  }
}
