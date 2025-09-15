import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Header />
      <Component {...pageProps} />
    <Footer />
    </>
  )
}
