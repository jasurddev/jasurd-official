import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Inisialisasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { title, vibe, type } = await request.json();

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json({ error: "API Key belum diset" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Prompt Engineering (Dukun Mode)
    let prompt = "";
    if (type === 'solver') {
      prompt = `Buatkan judul yang menarik (maksimal 10 kata) dan deskripsi jasa yang menjual (maksimal 3 kalimat) untuk jasa: "${title}".
      Gaya bahasa: ${vibe} (Savage = gaul, berani, sedikit kasar tapi lucu. Profesional = formal, meyakinkan. Empati = lembut, pengertian).
      Format output JSON: { "title": "...", "description": "..." }`;
    } else {
      prompt = `Buatkan judul request bantuan yang mendesak (maksimal 10 kata) dan deskripsi kebutuhan (maksimal 3 kalimat) untuk: "${title}".
      Gaya bahasa: ${vibe}.
      Format output JSON: { "title": "...", "description": "..." }`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Bersihkan JSON dari markdown ```json ... ```
    const cleanText = text.replace(/```json|```/g, "").trim();
    const jsonResponse = JSON.parse(cleanText);

    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Gagal memanggil Dukun AI" }, { status: 500 });
  }
}