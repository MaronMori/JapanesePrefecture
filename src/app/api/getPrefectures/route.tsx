import { NextResponse } from "next/server";

export async function GET() {
  const headers: HeadersInit = new Headers();

  try {
    const apiKey = process.env.RESAS_API_KEY;
    if (typeof apiKey === "string") {
      headers.append("X-API-KEY", apiKey);
    }
    const response = await fetch(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      {
        method: "GET",
        headers: headers,
      },
    );
    if (!response.ok) {
      console.log("レスポンスの取得に失敗");
      return;
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("APIのリクエストに失敗。" + error);
    return NextResponse.json(error, { status: 405 });
  }
}
