import Link from "next/link"
import styles from "../../styles/Categories.module.css"
import { useState } from "react";
import attributeMap from "../AttributeIcons/AttributeIcons";
import CategoryHeader from "./CategoryHeader";
import { useCart } from "@/context/CartContext";
function CategoryProducts({ Products, currentCategory }: any) {
  
      const [wishlist, setWishlist] = useState<string[]>([]);
const { cartItems, updateCart } = useCart();
      // Helper function to calculate discount percentage
    const getDiscountPercentage = (regular: number, final: number) => {
        if (!regular || regular <= final) return 0;
        return Math.round(((regular - final) / regular) * 100);
    };

    // Helper function to check if product has specific attribute
    const hasAttribute = (product: any, attribute: string) => {
        return product.product_attributes?.includes(attribute) || false;
    };

    // Helper function to get product badges with icons
    const getProductBadges = (product: any) => {
        const badges = [];



        // Add badges based on product attributes (limit to 3-4 most important ones)
        let badgeCount = 0;
        const maxBadges = 4;

        // Priority order for displaying badges
        const priorityOrder = [
            'gluten_free', 'vegan', 'lactose_free', 'organic_ingredients',
            'high_protein', 'keto_friendly', 'diabetic_friendly', 'no_preservatives',
            'plant_based', 'heart_healthy', 'all_natural'
        ];

        for (const attribute of priorityOrder) {
            if (badgeCount >= maxBadges) break;

            if (hasAttribute(product, attribute) && attributeMap[attribute]) {
                badges.push(attributeMap[attribute]);
                badgeCount++;
            }
        }

        // Add any remaining attributes not in priority order
        if (badgeCount < maxBadges && product.product_attributes) {
            for (const attribute of product.product_attributes) {
                if (badgeCount >= maxBadges) break;

                if (!priorityOrder.includes(attribute) && attributeMap[attribute]) {
                    badges.push(attributeMap[attribute]);
                    badgeCount++;
                }
            }
        }

        return badges;
    };

    const toggleWishlist = (productId: string) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };


        
    return (
        <div>
        <CategoryHeader currentCategory={currentCategory} />
        <div className={styles.categoryProductsWrapper}>
            
            {Products?.map((product:any ) =>{
                  const discount = getDiscountPercentage(product.regular_price || 0, product.final_price);
                            const badges = getProductBadges(product);
                            const productURL = `/product/${product?.slug}`
                return(

             
            <div className={styles.productCard} key={product?.id}>

                {discount > 0 && (
                    <div className={styles.discountBadge}>
                        {discount}% OFF
                    </div>
                )}
                {/* Wishlist Button */}
                <button
                    className={`${styles.wishlistBtn} ${wishlist.includes(product?.id) ? styles.wishlistActive : ''}`}
                    onClick={() => toggleWishlist(product?.id)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.includes(product?.id) ? "currentColor" : "none"} stroke="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                {/* Stock Badge */}
                {product?.quantity <= 10 && product?.quantity > 0 && (
                    <div className={styles.stockBadge}>
                        Only {product?.quantity} left!
                    </div>
                )}


                {/* Product Image */}
                <Link href={productURL} className={styles.productImageContainer}>

                    <div className={styles.imageWrapper}>
                        <img
                            src={`${process.env.baseURL}/assets/${product?.thumbnail}`}
                            alt={product?.title}
                            className={styles?.productImage}

                        />
                        <div className={styles?.imageGlow}></div>
                    </div>

                </Link>

                {/* Product Info */}
                <Link href={productURL} className={styles.productInfo}>


                    {/* Top Badges */}
                    {badges ? (<div className={styles.badgeContainer}>
                        {badges.map((badge:any, index:any) => (
                            <div
                                key={index}
                                className={
                                    badge.type === 'organic'
                                        ? styles.organicBadge
                                        : styles.specialBadge
                                }
                            >
                                <img src={badge?.iconURL} alt={badge?.type} title={badge?.label} />
                            </div>
                        ))}
                    </div>
                    ) : (null)}
                    {product?.product_weight === null ? (null) : <p className={styles.productVolume}>{product?.product_weight}</p>}

                    <h3 className={styles.productName} title={product.title}>
                        {product.title.length > 50
                            ? `${product.title.substring(0, 50)}...`
                            : product.title
                        }
                    </h3>
                    {/* Price and Add Button */}
                    <div className={styles.productFooter}>

                        <div className={styles.priceContainer}>
                            <span className={styles.productPrice}>₹{product.final_price}</span>
                            {product.regular_price && product.regular_price > product.final_price && (
                                <span className={styles.originalPrice}>₹{product.regular_price?.toFixed(2)}</span>
                            )}
                        </div>


                    </div>
                </Link>
              {product.quantity > 0 ? (
  cartItems[product.id]?.quantity ? (
    <div className={styles.quantityControls}>
      <button
        className={styles.quantityBtn}
        onClick={() => updateCart(product, -1)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <span className={styles.quantity}>
        {cartItems[product.id]?.quantity}
      </span>

      <button
        className={styles.quantityBtn}
        onClick={() => updateCart(product, 1)}
        disabled={cartItems[product.id]?.quantity >= product.quantity}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  ) : (
    <button
      className={styles.addButton}
      onClick={() => updateCart(product, 1)}
    >
      ADD
    </button>
  )
) : (
  <button className={styles.outOfStockButton} disabled>
    OUT OF STOCK
  </button>
)}
            </div>
               )
            })}
        </div>
        </div>
    )
}
export default CategoryProducts