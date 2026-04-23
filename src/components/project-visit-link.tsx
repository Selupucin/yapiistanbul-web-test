"use client";

type ProjectVisitLinkProps = {
  href: string;
  projectName: string;
  className?: string;
  children: React.ReactNode;
};

function detectDeviceType(): "mobile" | "desktop" | "tablet" {
  const ua = (typeof navigator !== "undefined" ? navigator.userAgent : "").toLowerCase();
  const touch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 1;

  if (/ipad|tablet/.test(ua) || (touch && /macintosh/.test(ua))) return "tablet";
  if (/iphone|android|mobile|mobi/.test(ua)) return "mobile";
  return "desktop";
}

export function ProjectVisitLink({ href, projectName, className, children }: ProjectVisitLinkProps) {
  const onClick = () => {
    const body = JSON.stringify({ projectName, path: "/projects", deviceType: detectDeviceType() });
    fetch("/api/public/analytics/project-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
    </a>
  );
}
