import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    credentials: "include", // Send session cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}
