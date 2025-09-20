import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import HeroSlider from "@/Components/Home/HeroSlider";
import { Client } from "./api/client";
import ProductSlider from "@/Components/Home/ProductSlider";


export default function Home({ heroSlides, allSliderProducts }: any) {
  return (
    <>
      <Head>
        <title>Organic</title>
        <meta name="description" content="Some healthy option" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="freeSpace"></div> */}
      <HeroSlider slides={heroSlides}  />
      <ProductSlider allSliderProducts={allSliderProducts}/>
    </>
  );
}

// ✅ Static Site Generation
export async function getStaticProps() {
  const client = new Client();
  const HeroSliderData = await client.fetchHeroSliderSection();
  const sliderProduct = await client.fetchHomePageProducts();

  return {
    props: {
      heroSlides: HeroSliderData?.data || [],
      allSliderProducts: sliderProduct?.data || [],
    },
    revalidate: 60, // ISR: regenerate every 60s
  };
}