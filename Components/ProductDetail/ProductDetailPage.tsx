"use client"
import styles from "../../styles/ProductDetails.module.css"
import Breadcrumb from "./Breadcrumb"
import ProductGallery from "./ProductGallery"
import ProductInfo from "./ProductInfo"
import ProductAttributes from "./ProductAttributes"
import ProductTabs from "./ProductTabs"
import ShortDescription from "./ShortDescription"
import { useState, useMemo } from "react"
import ProductSlider from "../Home/ProductSlider"
import ProductBrandingImage from "./ProductBrandingImage"
import OrganicPromises from "./OrganicPromises"


function ProductDetailPage({ product, categoriesList, relatedProducts, crossSellProducts, upSellProducts }: any) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

  // Add To Cart Functionality
  const updateCart = (productId: string, change: number) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  // Wishlist Functionality 

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // 🧩 Create Dynamic Breadcrumb
  const breadcrumbItems = useMemo(() => {
    if (!product?.title) return [];

    const items = [{ label: "Home", href: "/" }];

    const allCategories = categoriesList?.data || [];
    const currentCategory = allCategories.find(
      (cat: any) => cat.id === product.category
    );

    // If category not found, fallback
    if (!currentCategory) {
      items.push({ label: product.title, href: "#" });
      return items;
    }

    // Try finding parent category
    const parentCategory = allCategories.find(
      (cat: any) => cat.id === currentCategory.parent_category
    );

    // Add parent category if exists
    if (parentCategory) {
      items.push({
        label: parentCategory.category_name,
        href: `/${parentCategory.slug}`,
      });
    }

    // Add current category (safe fallback if parentCategory doesn’t exist)
    items.push({
      label: currentCategory.category_name,
      href: parentCategory
        ? `/${parentCategory.slug}/${currentCategory.slug}`
        : `/${currentCategory.slug}`,
    });

    // Add product title
    items.push({
      label: product.title,
      href: "#",
    });

    return items;
  }, [product, categoriesList]);

  return (
    <>
      <div className={styles.productDetailContainer}>
        <Breadcrumb
          items={breadcrumbItems}
        />

        <div className={styles.productDetailMain}>
          <div className={styles.productDetailLeft}>
            <ProductGallery thumbnail={product?.thumbnail} images={product?.images} />
            <OrganicPromises />
          </div>

          <div className={styles.productDetailCenter}>
            <ProductInfo
              product={product}
              cartItems={cartItems}
              updateCart={updateCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />

            <ShortDescription
              shortDescription={product.short_description}
            />
          </div>

          <div className={styles.productDetailRight}>
            <ProductAttributes attributes={product?.product_attributes} />
         
          </div>
        </div>
        <div className={styles.productDetailLayout}>
          <div className={styles.productDetailTabs}>
            <ProductTabs
              description={product.description}
              shortDescription={product.short_description}
              reviewCount={product.review_count}
            />
          </div>
           <div className={styles.productDetailImageContainer}>
               <ProductBrandingImage />
           </div>
        </div>
      </div>
      <ProductSlider
        allSliderProducts={relatedProducts}
        categoryLink=""
        sliderTitle="Related Products "
        sliderSubTitle="Here is Related Products You Must Like."
      />
      <ProductSlider
        allSliderProducts={crossSellProducts}
        categoryLink=""
        sliderTitle="You May Also Like "
        sliderSubTitle=""
      />
      <ProductSlider
        allSliderProducts={upSellProducts}
        categoryLink=""
        sliderTitle="Exclusive Picks "
        sliderSubTitle=""
      />

    </>
  )
}

export default ProductDetailPage
