import ProductDetailPage from "@/Components/ProductDetail/ProductDetailPage";
import { Client } from "../../pages/api/client";

const client = new Client();

export default function ProductPage({ product, categoriesList, relatedProducts, crossSellProducts, upSellProducts }: any) {
  if (!product) {
    return <p>Product not found.</p>;
  }
  console.log(product, 'product')
  return (
    <ProductDetailPage
      product={product}
      categoriesList={categoriesList}
      relatedProducts={relatedProducts} 
      crossSellProducts={crossSellProducts} 
      upSellProducts={upSellProducts}
    />
  );
}

// ✅ Generate static paths for all product slugs
export async function getStaticPaths() {
  const data = await client.fetchHomePageProducts();
  const products = data?.data || [];

  const paths = products.map((item: any) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: "blocking", // Generate new pages on-demand if not prebuilt
  };
}


export async function getStaticProps({ params }: any) {
  const { slug } = params;

  const product = await client.fetchProductBySlug(slug);
  if (!product) return { notFound: true };

  const relatedIds = product.related_products?.map((item: any) => item.related_products_id) || [];
  const crossSellIds = product.cross_sell_products?.map((item: any) => item.related_products_id) || [];
  const upSellIds = product.up_sell_products?.map((item: any) => item.related_products_id) || [];

  const [relatedProducts, crossSellProducts, upSellProducts] = await Promise.all([
    relatedIds.length ? client.fetchRelatedProductsByIDs(relatedIds) : [],
    crossSellIds.length ? client.fetchRelatedProductsByIDs(crossSellIds) : [],
    upSellIds.length ? client.fetchRelatedProductsByIDs(upSellIds) : [],
  ]);

  return {
    props: {
      product,
      relatedProducts,
      crossSellProducts,
      upSellProducts,
    },
    revalidate: 60,
  };
}

