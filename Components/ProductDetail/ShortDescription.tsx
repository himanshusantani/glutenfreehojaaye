import React from "react"
import styles from "../../styles/ProductDetails.module.css"



function ShortDescription({ shortDescription }: any) {
  return (
    <div className={styles.shortDescription}>
      <div className={styles.shortDescriptionHeading}> 
        <h3>Details</h3>
        </div>
         <div className={styles.descriptionContent} dangerouslySetInnerHTML={{ __html: shortDescription }} />
    </div>
  )
}

export default ShortDescription
