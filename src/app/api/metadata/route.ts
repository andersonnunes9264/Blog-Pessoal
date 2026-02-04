import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "URL inválida" });

  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Puxa o título, descrição e imagem das Meta Tags (OG Tags)
    const title = doc.querySelector('meta[property="og:title"]')?.getAttribute("content") 
                  || doc.title;
    const description = doc.querySelector('meta[property="og:description"]')?.getAttribute("content") 
                  || doc.querySelector('meta[name="description"]')?.getAttribute("content");
    const image = doc.querySelector('meta[property="og:image"]')?.getAttribute("content");

    return NextResponse.json({ title, description, image });
  } catch (error) {
    return NextResponse.json({ error: "Falha ao buscar metadados" }, { status: 500 });
  }
}