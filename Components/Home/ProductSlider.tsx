import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "../../styles/ProductsSlider.module.css";
import attributeMap from "../../Components/AttributeIcons/AttributeIcons"
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
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
    sliderSubTitle }: any) {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const { cartItems, updateCart } = useCart();
    // States for navigation button visibility
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const swiperRef = useRef<any>(null);

    
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
       null
        );
    }

    return (
        <>
            <div className={styles.productSliderContainer}>

                {/* Header */}
                <div className={styles.sliderHeader}>
                    <div className={styles.headerContent}>
                        <h3 className={styles.sliderTitle}>
                            {sliderTitle}
                        </h3>
                        {sliderSubTitle.length > 0 ? ( <p className={styles.sliderSubtitle}>{sliderSubTitle}</p>) : (null)}
                    </div>
                </div>

                {/* Swiper Slider */}
                <div className={styles.swiperWrapper}>
                    <Swiper
                        modules={[Navigation, Pagination, Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={2.3}
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
                        freeMode={true}
                        navigation={false} // Disable default navigation to use custom handlers
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={handleSlideChange}
                        breakpoints={{
                            // 640: {
                            //     slidesPerView: 3,
                            // },
                            768: {
                                slidesPerView: 4.5,
                            },
                            1024: {
                                slidesPerView: 5,
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
                            const productURL = `/product/${product?.slug}`
                            const quantity = cartItems[product.id]?.quantity || 0;
                            return (
                                <SwiperSlide key={product?.id}>

                                    <div className={styles.productCard}>

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
                                                 {badges ? ( <div className={styles.badgeContainer}>
                                                    {badges.map((badge, index) => (
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
                                            ):(null)}
                                               {product?.product_weight === null ? (null): <p className={styles.productVolume}>{product?.product_weight}</p> }

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
                                                  quantity > 0 ? (
                                                        <div className={styles.quantityControls}>
                                                            <button
                                                                className={styles.quantityBtn}
                                                                onClick={() => updateCart(product, -1)}
                                                            >
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                                </svg>
                                                            </button>
                                                            <span className={styles.quantity}> {quantity}</span>
                                                            <button
                                                                className={styles.quantityBtn}
                                                               onClick={() => updateCart(product, 1)}
                                                              disabled={quantity >= product.quantity}
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
                        <>
                        {categoryLink.length > 0 ? ( <a href={categoryLink} className="see-all-link">
                            <span>See All</span>
                        </a>) : (null)}
                       </>
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
          .swiper-button-prev-custom{
        //    left: 0px;
          display: none;  
        }
          .swiper-button-next-custom,
          .see-all-link {
            // right: 0px;
              display: none;
          }
        }
      `}</style>
        </>
    );
}

export default ProductSlider;