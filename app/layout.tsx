import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

export const metadata = {
  title: "Muhammad Fahad Khan | Principal Software Engineer",
  description:
    "Muhammad Fahad Khan is a principal software engineer building high-performance web and mobile products, open to remote work and relocation worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
