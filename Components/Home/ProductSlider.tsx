import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "../../styles/ProductsSlider.module.css";

interface Product {
    id: string;
    title: string;
    final_price: number;
    regular_price?: number;
    brand: string;
    thumbnail: string;
    description?: string;
    product_attributes?: string[];
    quantity: number;
    sku: string;
}

interface ProductSliderProps {
    allSliderProducts: Product[];
    title?: string;
    subtitle?: string;
    icon?: string;
}

function ProductSlider({
    allSliderProducts,

}: ProductSliderProps) {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

    console.log(allSliderProducts, 'allSliderProducts');

    // Helper function to calculate discount percentage
    const getDiscountPercentage = (regular: number, final: number) => {
        if (!regular || regular <= final) return 0;
        return Math.round(((regular - final) / regular) * 100);
    };

    // Helper function to check if product has specific attribute
    const hasAttribute = (product: Product, attribute: string) => {
        return product.product_attributes?.includes(attribute) || false;
    };

    // Helper function to get product badges with icons
    const getProductBadges = (product: Product) => {
        const badges = [];

        // Define badge mappings with icons
        const badgeMap: any = {
            'lactose_free': { type: 'dietary', label: '🥛 Lactose-Free' },
            'vegan': { type: 'dietary', label: '🌱 Vegan' },
            'gluten_free': { type: 'dietary', label: '🌾 Gluten-Free' },
            'made_with_millets': { type: 'ingredient', label: '🌾 Made with Millets' },
            'keto_friendly': { type: 'diet', label: '🥑 Keto-Friendly' },
            'diabetic_friendly': { type: 'health', label: '⚡ Diabetic-Friendly' },
            'pcos_friendly': { type: 'health', label: '💚 PCOS-Friendly' },
            'no_preservatives': { type: 'clean', label: '🚫 No Preservatives' },
            'no_refined_flour': { type: 'clean', label: '🌾 No Refined Flour' },
            'plant_based': { type: 'dietary', label: '🌿 Plant-Based' },
            'high_protein': { type: 'nutrition', label: '💪 High Protein' },
            'high_fiber': { type: 'nutrition', label: '🌾 High Fiber' },
            'low_carb': { type: 'nutrition', label: '⬇️ Low Carb' },
            'low_gi': { type: 'health', label: '📈 Low GI' },
            'soy_free': { type: 'allergen', label: '🚫 Soy-Free' },
            'nut_free': { type: 'allergen', label: '🥜 Nut-Free' },
            'dairy_free': { type: 'allergen', label: '🚫 Dairy-Free' },
            'egg_free': { type: 'allergen', label: '🥚 Egg-Free' },
            'no_artificial_colors': { type: 'clean', label: '🎨 No Artificial Colors' },
            'no_artificial_flavors': { type: 'clean', label: '🧪 No Artificial Flavors' },
            'non_gmo': { type: 'quality', label: '🧬 Non-GMO' },
            'organic_ingredients': { type: 'quality', label: '🌿 Organic' },
            'whole_grain': { type: 'ingredient', label: '🌾 Whole Grain' },
            'heart_healthy': { type: 'health', label: '❤️ Heart-Healthy' },
            'cholesterol_free': { type: 'health', label: '💚 Cholesterol-Free' },
            'trans_fat_free': { type: 'health', label: '🚫 Trans-Fat-Free' },
            'zero_palm_oil': { type: 'environmental', label: '🌴 Zero Palm Oil' },
            'sustainable_ingredients': { type: 'environmental', label: '♻️ Sustainable' },
            'clean_label': { type: 'quality', label: '✨ Clean Label' },
            'all_natural': { type: 'quality', label: '🌿 All Natural' }
        };

        // Add badges based on product attributes (limit to 3-4 most important ones)
        let badgeCount = 0;
        const maxBadges = 3;

        // Priority order for displaying badges
        const priorityOrder = [
            'gluten_free', 'vegan', 'lactose_free', 'organic_ingredients',
            'high_protein', 'keto_friendly', 'diabetic_friendly', 'no_preservatives',
            'plant_based', 'heart_healthy', 'all_natural'
        ];

        for (const attribute of priorityOrder) {
            if (badgeCount >= maxBadges) break;

            if (hasAttribute(product, attribute) && badgeMap[attribute]) {
                badges.push(badgeMap[attribute]);
                badgeCount++;
            }
        }

        // Add any remaining attributes not in priority order
        if (badgeCount < maxBadges && product.product_attributes) {
            for (const attribute of product.product_attributes) {
                if (badgeCount >= maxBadges) break;

                if (!priorityOrder.includes(attribute) && badgeMap[attribute]) {
                    badges.push(badgeMap[attribute]);
                    badgeCount++;
                }
            }
        }

        // Add stock badge if high quantity and space available
        // if (badgeCount < maxBadges && product.quantity > 50) {
        //   badges.push({ type: 'stock', label: '✅ In Stock' });
        // }

        return badges;
    };
    const toggleWishlist = (productId: string) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const updateCart = (productId: string, change: number) => {
        setCartItems(prev => ({
            ...prev,
            [productId]: Math.max(0, (prev[productId] || 0) + change)
        }));
    };

    // Handle empty or invalid data
    if (!allSliderProducts || allSliderProducts.length === 0) {
        return (
            <div className={styles.productSliderContainer}>
                <div className={styles.emptyState}>
                    <p>No products available</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.productSliderContainer}>
                {/* Swiper Slider */}
                <div className={styles.swiperWrapper}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1.2}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2.5,
                            },
                            768: {
                                slidesPerView: 3.5,
                            },
                            1024: {
                                slidesPerView: 4.5,
                            },
                            1280: {
                                slidesPerView: 5.5,
                            },
                            1536: {
                                slidesPerView: 6,
                            },
                        }}
                        className={styles.productSwiper}
                    >
                        {allSliderProducts.map((product:any) => {
                            const discount = getDiscountPercentage(product.regular_price || 0, product.final_price);
                            const badges = getProductBadges(product);

                            return (
                                <SwiperSlide key={product.id}>
                                    <div className={styles.productCard}>
                                        {/* Top Badges */}
                                        <div className={styles.badgeContainer}>
                                            {discount > 0 && (
                                                <div className={styles.discountBadge}>
                                                    {discount}% OFF
                                                </div>
                                            )}
                                            {badges.map((badge, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        badge.type === 'organic'
                                                            ? styles.organicBadge
                                                            : styles.specialBadge
                                                    }
                                                >
                                                    {badge.label}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Wishlist Button */}
                                        <button
                                            className={`${styles.wishlistBtn} ${wishlist.includes(product.id) ? styles.wishlistActive : ''}`}
                                            onClick={() => toggleWishlist(product.id)}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.includes(product.id) ? "currentColor" : "none"} stroke="currentColor">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </button>

                                        {/* Stock Badge */}
                                        {product.quantity <= 10 && product.quantity > 0 && (
                                            <div className={styles.stockBadge}>
                                                Only {product.quantity} left!
                                            </div>
                                        )}

                                        {/* Product Image */}
                                        <div className={styles.productImageContainer}>
                                            <div className={styles.imageWrapper}>
                                                <img
                                                    src={`${process.env.baseURL}/assets/${product.thumbnail}`}
                                                    alt={product.title}
                                                    className={styles.productImage}
                                                //   onError={(e) => {
                                                //     // Fallback image if thumbnail fails to load
                                                //     (e.target as HTMLImageElement).src = "/Images/HeroImage.png";
                                                //   }}
                                                />
                                                <div className={styles.imageGlow}></div>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className={styles.productInfo}>
                                            <h3 className={styles.productName} title={product.title}>
                                                {product.title.length > 50
                                                    ? `${product.title.substring(0, 50)}...`
                                                    : product.title
                                                }
                                            </h3>
                                            {/* <p className={styles.productVolume}>
                        {product.brand} • SKU: {product.sku}
                      </p>
                       */}
                                            <p className={styles.productVolume}>{product?.product_weight}</p>
                                            {/* Stock Status */}
                                            {/* <div className={styles.stockStatus}>
                        {product.quantity > 0 ? (
                          <span className={styles.inStock}>✓ In Stock ({product.quantity})</span>
                        ) : (
                          <span className={styles.outOfStock}>✗ Out of Stock</span>
                        )}
                      </div> */}

                                            {/* Price and Add Button */}
                                            <div className={styles.productFooter}>
                                                <div className={styles.priceContainer}>
                                                    <span className={styles.productPrice}>₹{product.final_price}</span>
                                                    {product.regular_price && product.regular_price > product.final_price && (
                                                        <span className={styles.originalPrice}>₹{product.regular_price}</span>
                                                    )}
                                                </div>

                                                {product.quantity > 0 ? (
                                                    cartItems[product.id] ? (
                                                        <div className={styles.quantityControls}>
                                                            <button
                                                                className={styles.quantityBtn}
                                                                onClick={() => updateCart(product.id, -1)}
                                                            >
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                                </svg>
                                                            </button>
                                                            <span className={styles.quantity}>{cartItems[product.id]}</span>
                                                            <button
                                                                className={styles.quantityBtn}
                                                                onClick={() => updateCart(product.id, 1)}
                                                                disabled={cartItems[product.id] >= product.quantity}
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
                                                            onClick={() => updateCart(product.id, 1)}
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
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <div className="swiper-button-prev-custom">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="swiper-button-next-custom">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          color: #6b7280;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background: #f9fafb;
          color: #374151;
          border-color: #d1d5db;
        }

        .swiper-button-prev-custom {
          left: 20px;
        }

        .swiper-button-next-custom {
          right: 20px;
        }

        @media (max-width: 1024px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            display: none;
          }
        }
      `}</style>
        </>
    );
}

export default ProductSlider;