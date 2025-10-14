import styles from '../../styles/Home.module.css'

function HomeCategories({ categoriesList }: any) {
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.categoriesHeader}>
        <h2>Shop by Category</h2>
        <p>Explore our curated range of healthy & organic essentials</p>
      </div>

      <div className={styles.categoriesGrid}>
        {categoriesList?.data.map((cat: any) => (
          <div className={styles.categoryCard} key={cat.id}>
            <div className={styles.categoryImageWrapper}>
              {cat.category_image ? (
                <img
                  src={`${process.env.baseURL}/assets/${cat.category_image}.jpg`}
                  alt={cat.category_name}
                  className={styles.categoryImage}
                />
              ) : (
                <div className={styles.placeholderImage}></div>
              )}
              <div className={styles.categoryOverlay}>
                <span className={styles.overlayText}>{cat.category_name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomeCategories
