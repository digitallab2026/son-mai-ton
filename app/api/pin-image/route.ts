import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pinUrl = searchParams.get("url");

  if (!pinUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const res = await fetch(pinUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      redirect: 'follow'
    });

    const html = await res.text();
    
    // Attempt to extract og:image or pin image JSON references
    const ogImageRegex = /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i;
    let match = html.match(ogImageRegex);
    let imageUrl = "";

    if (match && match[1]) {
      imageUrl = match[1];
    } else {
      // Try content="https://i.pinimg.com/... in another format
      const contentRegex = /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i;
      match = html.match(contentRegex);
      if (match && match[1]) {
        imageUrl = match[1];
      }
    }

    // Try finding any i.pinimg.com references if og:image fails
    if (!imageUrl) {
      const pinimgRegex = /(https:\/\/i\.pinimg\.com\/[^\s"']+)/g;
      const matches = html.match(pinimgRegex);
      if (matches && matches.length > 0) {
        // Find one that is likely a high-res image (usually contains /originals/ or /736x/)
        const highRes = matches.find(url => url.includes("/originals/") || url.includes("/736x/") || url.includes("/564x/"));
        imageUrl = highRes || matches[0];
      }
    }

    if (imageUrl) {
      // Decode entities if any
      imageUrl = imageUrl.replace(/&amp;/g, "&");
      return NextResponse.redirect(imageUrl);
    }

    // Fallbacks
    let fallback = "https://images.unsplash.com/photo-1542013936693-8848e5742331?q=80&w=800";
    if (pinUrl.includes("51nRMIOQy")) {
      fallback = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800";
    } else if (pinUrl.includes("fhi90Rab0")) {
      fallback = "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800";
    } else if (pinUrl.includes("1fWQvmIDj")) {
      fallback = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800";
    }
    
    return NextResponse.redirect(fallback);

  } catch (error) {
    console.error("Error resolving pin image:", error);
    return NextResponse.redirect("https://images.unsplash.com/photo-1542013936693-8848e5742331?q=80&w=800");
  }
}
