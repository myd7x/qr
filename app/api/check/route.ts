import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // 👇 READ TOKEN FROM CLIENT REQUEST
  const authHeader = req.headers.get("authorization");

  const backendRes = await fetch(
    "https://qrguard.onrender.com/check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader || "", // ✅ FORWARD TOKEN
      },
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json();

  return NextResponse.json(data, {
    status: backendRes.status,
  });
}
