import Link from "next/link";
import styles from "../../styles/Categories.module.css";

function SideCategories({ categoriesList, currentCategory }: any) {
    const categories = categoriesList?.data || [];

    const sortedCategories = [
        ...categories.filter((cat: any) => cat.id === currentCategory?.id),
        ...categories.filter((cat: any) => cat.id !== currentCategory?.id),
    ];

    // ✅ function to generate URL
    const getCategoryURL = (category: any) => {
        // parent category case
        if (category.parent_category) {
            const parent = categories.find(
                (cat: any) => cat.id === category.parent_category
            );

            if (parent) {
                return `/${parent.slug}/${category.slug}`;
            }
        }

        // parent_category === null
        return `/${category.slug}`;
    };

    return (
        <div className={styles.SideCategoriesMainContainer}>
            <div className={styles.SideCategoriesWrapper}>

                {sortedCategories.map((category: any, index: number) => {

                    const url = getCategoryURL(category);

                    return (
                        <Link href={url} key={category.id}>

                            <div
                                className={`${styles.SideCategoriesItem} ${
                                    index === 0 ? styles.active : ''
                                }`}
                            >
                                <img
                                    src={`${process.env.baseURL}/assets/${category.category_image}.jpg`}
                                    alt={category.category_name}
                                />
                                <span>{category.category_name}</span>
                            </div>

                        </Link>
                    );
                })}

            </div>
        </div>
    );
}

export default SideCategories;