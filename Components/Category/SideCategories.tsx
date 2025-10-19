import styles from "../../styles/Categories.module.css"

function SideCategories({categoriesList}:any){
    console.log(categoriesList,'categoriesList')
    return(
        <>
        <div className={styles.SideCategoriesMainContainer}>
        <div className={styles.SideCategoriesWrapper}>
            {categoriesList?.data.map((category:any)=>{
                return(
            <div className={styles.SideCategoriesItem}>
                
                   <img src={`${process.env.baseURL}/assets/${category.category_image}.jpg`} alt={category.category_name} />
                <span>{category.category_name}</span>
            </div>
               )
            })}
        </div>
        </div>
        </>
    )
}
export default SideCategories