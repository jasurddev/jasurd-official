import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { title, vibe, type } = await request.json();

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json({ error: "API Key belum diset di server" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Act as a creative copywriter.
      Task: Create a catchy title (max 10 words) and a selling description (max 3 sentences) for a gig/service.
      Input: "${title}"
      Tone: ${vibe} (Savage = slang, bold, funny. Profesional = formal, trustworthy. Empati = kind, understanding).
      Type: ${type} (solver = selling service, seeker = looking for help).
      
      IMPORTANT: Return ONLY valid JSON format without markdown code blocks.
      Example format: { "title": "...", "description": "..." }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Bersihkan Markdown (```json ... ```)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // Coba Parse
    try {
      const jsonResponse = JSON.parse(text);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", text);
      // Fallback kalau AI ngaco formatnya
      return NextResponse.json({ 
        title: title, 
        description: text // Balikin teks mentah aja daripada error
      });
    }

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Gagal memanggil Dukun AI" }, { status: 500 });
  }
}