import styles from "../../styles/Categories.module.css"

function CategoryHeader({currentCategory}:any){
 return(
    <>
     {/* Header */}
                <div className={styles.categoryHeader}>
                    <div className={styles.headerContent}>
                        <h3 className={styles.categoryTitle}>
                           {currentCategory.category_name ? currentCategory.category_name : '' }
                        </h3>
                         <p className={styles.categorySubtitle}>{currentCategory.short_description ? currentCategory.short_description : 'fffff' }</p>
                    </div>
                </div>
    </>
 )
}
export default CategoryHeader