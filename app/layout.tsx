import type { Metadata } from "next";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource/dm-serif-display/400-italic.css";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { site } from "./content";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RevealObserver from "./components/RevealObserver";
import ScrollProgress from "./components/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

// Runs before first paint: no light/dark flash, and `js` lets reveal-animations hide things only when JS will reveal them.
// Theme precedence: saved toggle choice > device setting > light. Follows the device live until a choice is saved.
const themeScript = `(function(){try{
var r=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)'),s=localStorage.getItem('theme');
r.classList.add('js');
function set(t){r.dataset.theme=t}
set(s==='dark'||s==='light'?s:(m.matches?'dark':'light'));
if(s!=='dark'&&s!=='light'){m.addEventListener('change',function(e){if(!localStorage.getItem('theme'))set(e.matches?'dark':'light')})}
}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <RevealObserver />
        <Header />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
