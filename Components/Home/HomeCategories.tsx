import Link from 'next/link';
import styles from '../../styles/Home.module.css'

function HomeCategories({ categoriesList }: any) {

   const categories = categoriesList?.data || [];

  // ✅ same URL logic
  const getCategoryURL = (category: any) => {
    if (category.parent_category) {
      const parent = categories.find(
        (cat: any) => cat.id === category.parent_category
      );

      if (parent) {
        return `/${parent.slug}/${category.slug}`;
      }
    }

    return `/${category.slug}`;
  };

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.categoriesHeader}>
        <h2>Shop by Category</h2>
        <p>Explore our curated range of healthy & organic essentials</p>
      </div>

      <div className={styles.categoriesGrid}>
        {categoriesList?.data.map((cat: any)=> {
          const url = getCategoryURL(cat);

          return (
            <Link href={url} key={cat.id}>
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
             </Link>
          );
         })}
      </div>
    </section>
  )
}

export default HomeCategories
