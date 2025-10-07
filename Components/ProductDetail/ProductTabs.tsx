"use client"

import { useState } from "react"
import styles from "../../styles/ProductDetails.module.css"

interface ProductTabsProps {
  description: string
  shortDescription: string
  reviewCount: number
}

function ProductTabs({ description, shortDescription, reviewCount }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className={styles.productTabs}>
      <div className={styles.tabHeaders}>
        <button
          className={`${styles.tabHeader} ${activeTab === "description" ? styles.tabHeaderActive : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`${styles.tabHeader} ${activeTab === "reviews" ? styles.tabHeaderActive : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviewCount || 0})
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "description" && (
          <div className={styles.descriptionTab}>
            <div className={styles.descriptionContent} dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}

        {activeTab === "reviews" && (
          <div className={styles.reviewsTab}>
            <p>There are no reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductTabs
