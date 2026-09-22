import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

export const metadata = {
  title: "Muhammad Fahad Khan | Principal Software Engineer & AI Engineer",
  description:
    "Muhammad Fahad Khan is a principal software engineer and AI engineer building AI-assisted products and high-performance web and mobile platforms.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
