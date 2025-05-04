import type { AppProps } from "next/app";
import "./globals.css";
import HeaderNavbar from "./components/navbar/header/header.navbar";
import MenuNavbar from "./components/navbar/menu/menu.navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ fontFamily: "google-sans, sans-serif" }}
      >
        <HeaderNavbar />
        <MenuNavbar />
        <main>
          <Component {...pageProps} />
        </main>
      </body>
    </html>
  );
}
