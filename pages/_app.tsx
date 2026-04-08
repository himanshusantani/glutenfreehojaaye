import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { NextPageContext } from "next";
import "@/styles/globals.css";
import { Client } from "./api/client";
import { CartProvider } from "@/context/CartContext";

let cachedData: any = null; 
function App({ Component, pageProps, categoriesList }: any) {
  return (
    <>
      <CartProvider>
    <Header categoriesList={categoriesList} />
      <Component categoriesList={categoriesList} {...pageProps} />
    <Footer />
    </CartProvider>
    </>
  )
}
App.getInitialProps = async (ctx: NextPageContext) => {
 
  if (!cachedData) {
    const client = new Client();
    const response = await client.fetchCategories();
    cachedData = { categoriesList: response };
  } 
  return cachedData;

}
export default App