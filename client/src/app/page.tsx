import { redirect } from "next/navigation";
const page = async () => {
  const me = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`);
  const result = await me.json();
  if (result.message === "Unauthorized") {
    redirect("/auth/login");
  } else {
    redirect("/main/dashboard");
  }
};

export default page;
