import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import HeroSlider from "@/Components/Home/HeroSlider";


export default function Home() {
  return (
    <>
      <Head>
        <title>Organic</title>
        <meta name="description" content="Some healthy option" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   {/* <div className="freeSpace"></div> */}
   <HeroSlider />
    </>
  );
}
