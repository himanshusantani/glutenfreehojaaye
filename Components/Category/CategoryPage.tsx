import CategoryBreadcrumbs from "./CategoryBreadcrumbs"
import CategoryHeader from "./CategoryHeader"
import SideCategories from "./SideCategories"
import styles from "../../styles/Categories.module.css"
import CategoryProducts from "./CategoryProducts"

function CategoryPage({ Products, categoriesList, slug }: any) {

const categories = categoriesList?.data || [];



    // Find current category
    const currentCategory = categories.find((cat: any) => cat.slug === slug);

    // Function to build breadcrumb path
    const buildBreadcrumb = (category: any, allCategories: any[]) => {
        const path = [];

        let current = category;

        while (current) {
            path.unshift({
                label: current.title || current.category_name,
                href: `/${current.slug}`
            });

            current = allCategories.find(
                (cat: any) => cat.id === current.parent_category
            );
        }

        return path;
    };

    const dynamicBreadcrumb = [
        { label: "Home", href: "/" },
        ...(currentCategory ? buildBreadcrumb(currentCategory, categories) : [])
    ];

    const breadCrumb = [
        {
            "label": "Home",
            "href": "/"
        },
        {
            "label": "Pasta & Noodles",
            "href": "/pasta-and-noodles"
        },
        {
            "label": "Pasta",
            "href": "/pasta-and-noodles/pasta"
        },
        {
            "label": "Chef Urbano Gluten Free Multi Veggie Fusilli Pasta 250 Gms| No Maida | No Wheat | No Transfat | Healthy Pasta | High Fibre | High Protein",
            "href": "#"
        }
    ]
    
    return (
        <>
            <div className={styles.categoryMainContainer}>
                <CategoryBreadcrumbs items={dynamicBreadcrumb} />
                
                <div className={styles.categoryWrapper}>
                    <SideCategories categoriesList={categoriesList} currentCategory={currentCategory}/>
                    <CategoryProducts Products={Products} categoriesList={categoriesList} currentCategory={currentCategory} />
                </div>
            </div>
        </>
    )
}
export default CategoryPage