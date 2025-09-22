import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards, Mousewheel } from 'swiper/modules';
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



function ProductSlider({
    allSliderProducts,
    categoryLink,
    sliderTitle,
    sliderSubTitle}: any) {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
    
    // States for navigation button visibility
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    
    const swiperRef = useRef<any>(null);

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

        const badgeMap: any = {
            'lactose_free': { type: 'dietary', iconURL: '/Icons/ColoredIcon/lactose-free.png' , label: 'Lactose-Free' },
            'vegan': { type: 'dietary', iconURL: '/Icons/ColoredIcon/vegan.png' , label: 'Vegan' },
            'gluten_free': { type: 'dietary', iconURL: '/Icons/ColoredIcon/gluten-free.png', label: 'Gluten-Free' },
            'made_with_millets': { type: 'ingredient', iconURL: '/Icons/ColoredIcon/millet.png' , label: 'Made with Millets' },
            'keto_friendly': { type: 'diet', iconURL: '/Icons/ColoredIcon/keto.png' , label: 'Keto-Friendly' },
            'diabetic_friendly': { type: 'health', iconURL: '/Icons/ColoredIcon/sugar-free.png', label: 'Diabetic-Friendly' },
            'pcos_friendly': { type: 'health', iconURL: '/Icons/ColoredIcon/PCSO.png' , label: 'PCOS-Friendly' },
            'no_preservatives': { type: 'clean', iconURL: '/Icons/ColoredIcon/no-preservatives.png' , label: 'No Preservatives' },
            'no_refined_flour': { type: 'clean', iconURL: '/Icons/ColoredIcon/refind-flour.png' , label: 'No Refined Flour' },
            'plant_based': { type: 'dietary', iconURL: '/Icons/ColoredIcon/Plant-Based.png', label: 'Plant-Based' },
            'high_protein': { type: 'nutrition', iconURL: '/Icons/ColoredIcon/high-protein.png' , label: 'High Protein' },
            'high_fiber': { type: 'nutrition', iconURL: '/Icons/ColoredIcon/high-fiber.png' , label: 'High Fiber' },
            'low_carb': { type: 'nutrition', iconURL: '/Icons/ColoredIcon/low-crab.png', label: 'Low Carb' },
            'low_gi': { type: 'health', iconURL: '/Icons/ColoredIcon/glycemic-index.png' , label: 'Low GI' },
            'soy_free': { type: 'allergen', iconURL: '/Icons/ColoredIcon/Soy Free.png' , label: 'Soy-Free' },
            'nut_free': { type: 'allergen', iconURL: '/Icons/ColoredIcon/nut.png' , label: 'Nut-Free' },
            'dairy_free': { type: 'allergen', iconURL: '/Icons/ColoredIcon/dairy-free.png' , label: 'Dairy-Free' },
            'egg_free': { type: 'allergen', iconURL: '/Icons/ColoredIcon/no-egg.png', label: 'Egg-Free' },
            'no_artificial_colors': { type: 'clean', iconURL: '/Icons/ColoredIcon/no-artificial-colours.png' , label: 'No Artificial Colors' },
            'no_artificial_flavors': { type: 'clean', iconURL: '/Icons/ColoredIcon/no-artificial-flavors.png' , label: 'No Artificial Flavors' },
            'non_gmo': { type: 'quality', iconURL: '/Icons/ColoredIcon/GMO.png', label: 'Non-GMO' },
            'organic_ingredients': { type: 'quality', iconURL: '/Icons/ColoredIcon/organic.png', label: 'Organic' },
            'whole_grain': { type: 'ingredient', iconURL: '/Icons/ColoredIcon/whole-wheat.png', label: 'Whole Grain' },
            'heart_healthy': { type: 'health', iconURL: '/Icons/ColoredIcon/heart-friendly.png' , label: 'Heart-Healthy' },
            'cholesterol_free': { type: 'health', iconURL: '/Icons/ColoredIcon/no-cholesterol.png' , label: 'Cholesterol-Free' },
            'trans_fat_free': { type: 'health', iconURL: '/Icons/ColoredIcon/trans-fat.png' , label: 'Trans-Fat-Free' },
            'zero_palm_oil': { type: 'environmental', iconURL: '/Icons/ColoredIcon/palm-oil-free.png', label: 'Zero Palm Oil' },
            'sustainable_ingredients': { type: 'environmental', iconURL: '/Icons/ColoredIcon/sustainability.png' , label: 'Sustainable' },
            'clean_label': { type: 'quality', iconURL: '/Icons/ColoredIcon/clean.png' , label: 'Clean Label' },
            'all_natural': { type: 'quality', iconURL: '/Icons/ColoredIcon/all-organic.png' , label: 'All Natural' },
        };

        // Add badges based on product attributes (limit to 3-4 most important ones)
        let badgeCount = 0;
        const maxBadges = 5;

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

    // Handle swiper events
    const handleSlideChange = (swiper: any) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    // Navigation handlers
    const handlePrevClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
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
                
                {/* Header */}
                <div className={styles.sliderHeader}>
                    <div className={styles.headerContent}>
                        <h2 className={styles.sliderTitle}>
                            {sliderTitle}
                        </h2>
                        <p className={styles.sliderSubtitle}>{sliderSubTitle}</p>
                    </div>
                </div>

                {/* Swiper Slider */}
                <div className={styles.swiperWrapper}>
                    <Swiper
                        modules={[Navigation, Pagination, Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={1.2}
                        simulateTouch={true}
                        allowTouchMove={true}
                        touchRatio={1}
                        touchAngle={45}
                        threshold={5}
                        longSwipesRatio={0.5}
                        longSwipesMs={300}
                        followFinger={true}
                        grabCursor={true}
                        mousewheel={{
                            forceToAxis: true,
                            sensitivity: 1,
                            releaseOnEdges: true,
                        }}
                        freeMode={false}
                        navigation={false} // Disable default navigation to use custom handlers
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={handleSlideChange}
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
                        {allSliderProducts.map((product: any) => {
                            const discount = getDiscountPercentage(product.regular_price || 0, product.final_price);
                            const badges = getProductBadges(product);

                            return (
                                <SwiperSlide key={product.id}>
                                    <div className={styles.productCard}>

                                        {discount > 0 && (
                                            <div className={styles.discountBadge}>
                                                {discount}% OFF
                                            </div>
                                        )}
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
                                            <p className={styles.productVolume}>{product?.product_weight}</p>

                                            {/* Top Badges */}
                                            <div className={styles.badgeContainer}>
                                                {badges.map((badge, index) => (
                                                    <div
                                                        key={index}
                                                        className={
                                                            badge.type === 'organic'
                                                                ? styles.organicBadge
                                                                : styles.specialBadge
                                                        }
                                                    >
                                                        <img src={badge?.iconURL} alt={badge?.type} title={badge?.label}/>
                                                    </div>
                                                ))}
                                            </div>

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
                    {!isBeginning && (
                        <div className="swiper-button-prev-custom" onClick={handlePrevClick}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                    
                    {!isEnd ? (
                        <div className="swiper-button-next-custom" onClick={handleNextClick}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    ) : (
                        <a href={categoryLink} className="see-all-link">
                            <span>See All</span>
                            {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg> */}
                        </a>
                    )}
                </div>
            </div>

              <style jsx>{`
        .swiper-button-prev-custom,
        .swiper-button-next-custom,
        .see-all-link {
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
          text-decoration: none;
        }

        .see-all-link {
          width: auto;
          padding: 0 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          gap: 8px;
          white-space: nowrap;
           background: white;
          border: 1px solid #e5e7eb;
          color: #6b7280;
          border: none;
        }

        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background: #f9fafb;
          color: #374151;
          border-color: #d1d5db;
        }

        .see-all-link:hover {
   background: #f9fafb;
          color: #374151;
          border-color: #d1d5db;
              text-decoration: underline;
        }

        .swiper-button-prev-custom {
          left: 20px;
        }

        .swiper-button-next-custom,
        .see-all-link {
          right: 20px;
        }

        @media (max-width: 1024px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom,
          .see-all-link {
            display: none;
          }
        }
      `}</style>
        </>
    );
}

export default ProductSlider;