import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");

    const backendRes = await fetch(
      "https://qrguard.onrender.com/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader || "",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json();

    return NextResponse.json(data, {
      status: backendRes.status,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Scan proxy failed" },
      { status: 500 }
    );
  }
}
