import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata = {
  title: "Muhammad Fahad Khan | Principal Software Engineer",
  description:
    "Principal Software Engineer with 8+ years across React.js, Next.js, React Native and Node.js. Frontend architecture for Williams-Sonoma, Backcountry and MotoSport. Open to remote roles worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
