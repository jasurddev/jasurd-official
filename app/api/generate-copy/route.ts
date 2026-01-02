import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { title, vibe, type } = await request.json();

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json({ error: "API Key belum diset di server" }, { status: 500 });
    }

    // FIX: Ganti model ke 'gemini-1.5-flash' (Lebih baru, cepat, & support JSON mode)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json" // Paksa output JSON
      }
    });

    const prompt = `
      Act as a creative copywriter for a gig marketplace called Jasurd (Jasa Absurd).
      Task: Create a catchy title (max 10 words) and a selling description (max 3 sentences).
      
      Input: "${title}"
      Tone: ${vibe} (Savage = slang, bold, funny. Profesional = formal, trustworthy. Empati = kind, understanding).
      Type: ${type} (solver = selling service, seeker = looking for help).
      
      Return JSON with keys: "title" and "description".
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Karena udah pake responseMimeType: "application/json", 
    // kita gak perlu regex replace markdown lagi. Langsung parse aja.
    try {
      const jsonResponse = JSON.parse(text);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", text);
      return NextResponse.json({ 
        title: title, 
        description: text 
      });
    }

  } catch (error: any) {
    console.error("AI Error:", error);
    // Return pesan error yang lebih jelas buat debugging di frontend
    return NextResponse.json(
      { error: error?.message || "Gagal memanggil Dukun AI" }, 
      { status: 500 }
    );
  }
}