import Head from "next/head";

import CategoryPage from "@/Components/Category/CategoryPage";
import { Client } from "@/pages/api/client";

function Slug2({ categoriesList, Products, slug }: any) {
    console.log(Products,  'kihkhkhb')
  return (
    <>
      <Head>
        <title>Category Title</title>
        <meta name="description" content="Some healthy option" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <CategoryPage 
        Products={Products} 
        categoriesList={categoriesList} 
        slug={slug} 
      />
    </>
  );
}

export default Slug2;


export async function getStaticPaths() {
  const client = new Client();
  const categoriesRes = await client.fetchCategories();

  const categories = categoriesRes?.data || [];

  const paths = categories
    .filter((cat: any) => cat.parent_category !== null)
    .map((cat: any) => {
      const parent = categories.find(
        (p: any) => p.id === cat.parent_category
      );

      if (!parent) return null;

      return {
        params: {
          slug: parent.slug,   // ✅ must match folder name
          slug2: cat.slug,     // ✅ must match file name
        },
      };
    })
    .filter(Boolean);

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

  // ✅ correct params
  const { slug, slug2 } = params;

  // ✅ parent
  const parentCategory = categories.find(
    (cat: any) => cat.slug === slug
  );

  // ✅ child
  const selectedCategory = categories.find(
    (cat: any) =>
      cat.slug === slug2 &&
      cat.parent_category === parentCategory?.id
  );

  let filteredProducts: any[] = [];

  if (selectedCategory) {
    const productIds = selectedCategory.products.map(
      (p: any) => p.products_id
    );

    filteredProducts = allProducts.filter((product: any) =>
      productIds.includes(product.id)
    );
  }

  return {
    props: {
      Products: filteredProducts,
      categoriesList: categoriesRes,
      slug: slug2, // child slug for UI
    },
    revalidate: 60,
  };
}