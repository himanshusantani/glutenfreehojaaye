import React from "react"
import styles from "../../styles/ProductDetails.module.css"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

function Breadcrumb({ items }: BreadcrumbProps) {

  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) => (
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

export default Breadcrumb
