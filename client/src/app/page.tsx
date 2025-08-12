// app/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  redirect("/main/dashboard"); // Redirect to main if logged in
}
