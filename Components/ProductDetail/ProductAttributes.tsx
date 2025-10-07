import styles from "../../styles/ProductDetails.module.css";
import attributeMap from "../../Components/AttributeIcons/AttributeIcons"
interface ProductAttributesProps {
  attributes: string[];
}



function ProductAttributes({ attributes }: ProductAttributesProps) {
 const safeAttributes =
    !attributes || attributes.length === 0 ? ["all_natural"] : attributes;


  return (
    <div className={styles.productAttributes}>
      <h3 className={styles.attributesTitle}>Highlights</h3>

      <div className={styles.attributesList}>
        {safeAttributes.map((key) => {
          const attribute = attributeMap[key] || {
            label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          };

          return (
            <div key={key} className={styles.attributeItem}>
              <div className={styles.attributeIcon}><img src={attribute?.iconURL} alt={attribute?.type} title={attribute?.label}/></div>
              <div className={styles.attributeContent}>
                <span className={styles.attributeLabel}>{attribute.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductAttributes;
