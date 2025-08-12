// app/page.tsx
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/main/dashboard"); // Redirect to main if logged in
}
