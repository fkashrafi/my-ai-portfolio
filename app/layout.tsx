import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

export const metadata = {
  title: "Muhammad Fahad Khan | Senior Software Engineer",
  description:
    "Senior software engineer building modern web and mobile products with JavaScript, TypeScript, React, Next.js, React Native, and Node.js.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
