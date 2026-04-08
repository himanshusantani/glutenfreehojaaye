"use client";

import { useCart } from "@/context/CartContext";
import styles from "../../styles/MiniCart.module.css";

export default function MiniCart({ isOpen, onClose }: any) {
  const { cartItems, updateCart } = useCart();
  const items = Object.values(cartItems);

  const itemsTotal = items.reduce(
    (sum: number, item: any) => sum + item.final_price * item.quantity,
    0
  );

  const handlingCharge = items.length > 0 ? 2 : 0;
  const grandTotal = itemsTotal + handlingCharge;

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}

      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        
        {/* Header */}
        <div className={styles.header}>
          <h3>My Cart ({items.length})</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className={styles.empty}>
            <p>Your cart is empty 🛒</p>
            <span>Add items to get started</span>
          </div>
        )}

        {/* Items */}
        <div className={styles.items}>
          {items.map((item: any) => (
            <div key={item.id} className={styles.item}>
              
              <img
                src={`${process.env.baseURL}/assets/${item.thumbnail}`}
                className={styles.image}
              />

              <div className={styles.info}>
                <p className={styles.title}>{item.title}</p>
                <span className={styles.weight}>{item.product_weight}</span>

                <div className={styles.priceRow}>
                  <p className={styles.price}>
                    ₹{item.final_price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className={styles.qty}>
                <button onClick={() => updateCart(item, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCart(item, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            
            <div className={styles.bill}>
              <div>
                <span>Items Total</span>
                <p>₹{itemsTotal.toLocaleString("en-IN")}</p>
              </div>

              <div>
                <span>Handling</span>
                <p>₹{handlingCharge}</p>
              </div>

              <div className={styles.total}>
                <span>Total</span>
                <p>₹{grandTotal.toLocaleString("en-IN")}</p>
              </div>
            </div>

            <button className={styles.checkout}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}