import React from "react"
import styles from "../../styles/Categories.module.css"

function CategoryBreadcrumbs({items}:any){
    return(
        <nav className={styles.breadcrumb}>
      {items.map((item:any , index:any) => (
        <React.Fragment key={index}>
          {index === items?.length - 1 ? (
            <span className={styles.breadcrumbCurrent}>{item?.label?.length > 40 ? `${item?.label?.slice(0, 40)}...` : item?.label} </span>
          ) : (
            <>
              <a href={item?.href} className={styles.breadcrumbLink}>
               {item?.label}
              </a>
              <span className={styles.breadcrumbSeparator}>{">"}</span>
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
    )
}
export default CategoryBreadcrumbs