import CategoryBreadcrumbs from "./CategoryBreadcrumbs"
import CategoryHeader from "./CategoryHeader"
import SideCategories from "./SideCategories"
import styles from "../../styles/Categories.module.css"
import CategoryProducts from "./CategoryProducts"

function CategoryPage({ allSliderProducts, categoriesList }: any) {
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
                <CategoryBreadcrumbs items={breadCrumb} />
                <CategoryHeader />
                <div className={styles.categoryWrapper}>
                    <SideCategories categoriesList={categoriesList} />
                    <CategoryProducts Products={allSliderProducts} />
                </div>
            </div>
        </>
    )
}
export default CategoryPage