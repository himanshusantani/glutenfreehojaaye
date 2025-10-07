import styles from "../../styles/ProductDetails.module.css"

function ProductInfo({ product, cartItems, updateCart, toggleWishlist, wishlist }: any) {

  // Helper function to calculate discount percentage
  const getDiscountPercentage = (regular: number, final: number) => {
    if (!regular || regular <= final) return 0;
    return Math.round(((regular - final) / regular) * 100);
  };

  const discount = getDiscountPercentage(product.regular_price || 0, product.final_price);

  // Reviews 
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>,
      )
    }
    return stars
  }

  return (
    <div className={styles.productInfo}>

      <h1 className={styles.productTitle}>Haagen Caramel Cone Ice Cream Boxed</h1>

      <div className={styles.productRating}>
        <div className={styles.stars}>{renderStars(product.rating)}</div>
        <span className={styles.reviewCount}>({product.review_count || 0})</span>
      </div>

      <div className={styles.productPrice}>
        <span className={styles.originalPrice}>₹{product.regular_price.toFixed(2)}</span>
        <span className={styles.salePrice}>₹{product.final_price.toFixed(2)}</span>
        {discount > 0 && (
          <div className={styles.discountBadge}>
            {discount}% OFF
          </div>
        )}
      </div>

      <div className={styles.stockInfo}>
        <span className={styles.stockCount}>{product.stock} In stock</span>
      </div>

      <div className={styles.productActions}>
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

        {/* Wishlist Button */}
        <button
          className={`${styles.wishlistBtn} ${wishlist.includes(product.id) ? styles.wishlistActive : ''}`}
          onClick={() => toggleWishlist(product.id)}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill={wishlist.includes(product.id) ? "currentColor" : "none"} stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProductInfo
