type Props = {
  url: string;
  title?: string;
};

function toEmbedUrl(url: string): { kind: "iframe" | "video"; src: string } | null {
  if (!url) return null;
  const u = url.trim();

  // YouTube
  const ytMatch = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  if (ytMatch) {
    return { kind: "iframe", src: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }

  // Vimeo
  const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Direct video file
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(u)) {
    return { kind: "video", src: u };
  }

  // Fallback: assume iframe-friendly URL
  return { kind: "iframe", src: u };
}

export function ProjectVideo({ url, title }: Props) {
  const embed = toEmbedUrl(url);
  if (!embed) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#dbe7fa] bg-black shadow-[0_14px_30px_rgba(10,44,100,0.12)]">
      {embed.kind === "iframe" ? (
        <iframe
          src={embed.src}
          title={title || "Proje videosu"}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={embed.src} controls className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  );
}
