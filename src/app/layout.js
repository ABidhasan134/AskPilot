import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-Mona-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "Ask Pilot",
  description: "AI powered platfrom for preperring for mock interview",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans} antialiased pattern`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
