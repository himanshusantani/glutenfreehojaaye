import styles from "../../styles/Categories.module.css"

function CategoryHeader(){
 return(
    <>
     {/* Header */}
                <div className={styles.categoryHeader}>
                    <div className={styles.headerContent}>
                        <h3 className={styles.categoryTitle}>
                            Cakes
                        </h3>
                         <p className={styles.categorySubtitle}>Healthy and Gluten Free Cake</p>
                    </div>
                </div>
    </>
 )
}
export default CategoryHeader