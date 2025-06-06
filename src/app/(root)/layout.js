import { Mona_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/navbar";
import AuthProdiver from "@/services/authProdiver";

export const monaSans = Mona_Sans({
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
        className={`${monaSans} antialiased pattern root-layout`}
        cz-shortcut-listen="true"
      >
        <AuthProdiver>
        <Navbar></Navbar>
        {children}
        </AuthProdiver>
      </body>
    </html>
  );
}
