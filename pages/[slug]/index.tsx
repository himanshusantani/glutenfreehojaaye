import Head from "next/head";
import { Client } from "../api/client";
import CategoryBreadcrumbs from "@/Components/Category/CategoryBreadcrumbs";
import CategoryHeader from "@/Components/Category/CategoryHeader";
import CategoryPage from "@/Components/Category/CategoryPage";
import { useEffect, useState } from "react";

function Slug1({
    //  allSliderProducts,
      categoriesList }: any) {
        const [allSliderProducts, setAllSliderProducts] = useState<any[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new Client();
        const sliderProduct = await client.fetchHomePageProducts();
        setAllSliderProducts(sliderProduct?.data || []);
        
        // Example: If you also need categories, uncomment and adjust:
        // const categories = await client.fetchCategories();
        // setCategoriesList(categories?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

    return (
        <>
            <Head>
                <title>Category Title</title>
                <meta name="description" content="Some healthy option" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
         <CategoryPage allSliderProducts={allSliderProducts} categoriesList={categoriesList}/>

        </>
    )
}
export default Slug1

// export async function getStaticProps() {
//     const client = new Client();

//     const sliderProduct = await client.fetchHomePageProducts();

//     return {
//         props: {
//             allSliderProducts: sliderProduct?.data || [],
//         },
//         revalidate: 60, 
//     };
// }