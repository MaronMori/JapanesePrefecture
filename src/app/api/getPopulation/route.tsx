import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json();
  const prefCode = request.prefCode;
  const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`;
  const headers: HeadersInit = new Headers();

  try {
    const apiKey = process.env.RESAS_API_KEY;
    if (typeof apiKey === "string") {
      headers.append("X-API-KEY", apiKey);
    }
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "RESASのリクエストがうまくいきませんでした、" },
        { status: 406 },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 407 });
  }
}
