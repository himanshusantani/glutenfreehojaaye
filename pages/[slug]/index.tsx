import Head from "next/head";
import { Client } from "../api/client";
import CategoryPage from "@/Components/Category/CategoryPage";

function Slug1({ categoriesList, Products, slug }: any) {
  return (
    <>
      <Head>
        <title>Category Title</title>
        <meta name="description" content="Some healthy option" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CategoryPage Products={Products} categoriesList={categoriesList} slug={slug} />
    </>
  )
}
export default Slug1

export async function getStaticPaths() {
  const client = new Client();
  const categoriesRes = await client.fetchCategories();

  const categories = categoriesRes?.data || [];

  const paths = categories
    .filter((cat: any) => cat.parent_category === null)
    .map((cat: any) => ({
      params: { slug: cat.slug },
    }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const client = new Client();

  const categoriesRes = await client.fetchCategories();
  const productsRes = await client.fetchHomePageProducts();

  const categories = categoriesRes?.data || [];
  const allProducts = productsRes?.data || [];

  const slug = params.slug;

  // 1. Find category by slug
  const selectedCategory = categories.find(
    (cat: any) => cat.slug === slug && cat.parent_category === null
  );

  let filteredProducts: any[] = [];

  if (selectedCategory) {
    // 2. Get product IDs from category
    const productIds = selectedCategory.products.map(
      (p: any) => p.products_id
    );

    // 3. Match with allProducts
    filteredProducts = allProducts.filter((product: any) =>
      productIds.includes(product.id)
    );
  }

  return {
    props: {
      Products: filteredProducts,
      categoriesList: categoriesRes,
      slug: params.slug,
    },
    revalidate: 60,
  };
}