import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { NextPageContext } from "next";
import "@/styles/globals.css";
import { Client } from "./api/client";

let cachedData: any = null; 
function App({ Component, pageProps, categoriesList }: any) {
  return (
    <>
    <Header categoriesList={categoriesList} />
      <Component {...pageProps} />
    <Footer />
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