import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const VIDEO_EXT = [".mp4", ".webm", ".mov"];

export async function GET() {
  const mediaDir = path.join(process.cwd(), "public", "media");

  if (!fs.existsSync(mediaDir)) {
    return NextResponse.json({ files: [] });
  }

  const files = fs
    .readdirSync(mediaDir)
    .filter((name) => !name.startsWith("."))
    .map((name) => {
      const ext = path.extname(name).toLowerCase();
      let type = null;
      if (IMAGE_EXT.includes(ext)) type = "image";
      if (VIDEO_EXT.includes(ext)) type = "video";
      if (!type) return null;
      return {
        id: `local-${name}`,
        type,
        url: `/media/${name}`,
        name: path.basename(name, ext),
      };
    })
    .filter(Boolean);

  return NextResponse.json({ files });
}