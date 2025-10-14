import styles from "../../styles/ProductDetails.module.css";

function OrganicPromises() {
  return (
    <div className={styles.OrganicPromises}>
      <h4>Why Trust {process.env.siteName} For Your Food?</h4>

      {/* Promise 1 */}
      <div className={styles.OrganicPromisesColumn}>
        <div className={styles.iconWrapper}>
          <div className={styles.OrganicPromisesImageContainer}>
            <img
              src="/Images/Fast-Delivery.jpg"
              alt="Fast Delivery"
              width={56}
              height={56}
            />
          </div>
        </div>
        <div className={styles.OrganicPromisesTextContent}>
          <div className={styles.OrganicPromisesName}>Fast Delivery</div>
          <div className={styles.OrganicPromisesDescription}>
            Get your order delivered fresh and fast, straight to your doorstep.
          </div>
        </div>
      </div>

      {/* Promise 2 */}
      <div className={styles.OrganicPromisesColumn}>
        <div className={styles.iconWrapper}>
          <div className={styles.OrganicPromisesImageContainer}>
            <img
              src="/Images/Certified-Organic.jpg"
              alt="Organic Quality"
              width={56}
              height={56}
            />
          </div>
        </div>
        <div className={styles.OrganicPromisesTextContent}>
          <div className={styles.OrganicPromisesName}>Certified Organic Quality</div>
          <div className={styles.OrganicPromisesDescription}>
            Every product is made with clean, natural, and chemical-free ingredients.
          </div>
        </div>
      </div>

      {/* Promise 3 */}
      <div className={styles.OrganicPromisesColumn}>
        <div className={styles.iconWrapper}>
          <div className={styles.OrganicPromisesImageContainer}>
            <img
              src="/Images/Freshness-Guaranteed.jpg"
              alt="Freshness Guaranteed"
              width={56}
              height={56}
            />
          </div>
        </div>
        <div className={styles.OrganicPromisesTextContent}>
          <div className={styles.OrganicPromisesName}>Freshness Guaranteed</div>
          <div className={styles.OrganicPromisesDescription}>
            We source directly from farms to ensure your food stays pure and fresh.
          </div>
        </div>
      </div>

      {/* Promise 4 */}
      {/* <div className={styles.OrganicPromisesColumn}>
        <div className={styles.iconWrapper}>
          <div className={styles.OrganicPromisesImageContainer}>
            <img
              src="/Images/sustainable.png"
              alt="Sustainable Sourcing"
              width={56}
              height={56}
            />
          </div>
        </div>
        <div className={styles.OrganicPromisesTextContent}>
          <div className={styles.OrganicPromisesName}>Sustainably Sourced</div>
          <div className={styles.OrganicPromisesDescription}>
            Supporting eco-friendly practices and local farmers with every order.
          </div>
        </div>
      </div> */}

      {/* Promise 5 */}
      <div className={styles.OrganicPromisesColumn}>
        <div className={styles.iconWrapper}>
          <div className={styles.OrganicPromisesImageContainer}>
            <img
              src="/Images/Clean-Lab.jpg"
              alt="Clean Label Promise"
              width={56}
              height={56}
            />
          </div>
        </div>
        <div className={styles.OrganicPromisesTextContent}>
          <div className={styles.OrganicPromisesName}>Clean Label Promise</div>
          <div className={styles.OrganicPromisesDescription}>
            No preservatives, no artificial colors or flavors only natural goodness.
          </div>
        </div>
      </div>

      {/* Promise 6 */}
      <div className={styles.OrganicPromisesColumn}>
        <div className={styles.iconWrapper}>
          <div className={styles.OrganicPromisesImageContainer}>
            <img
              src="/Images/Health-And-Trust.jpg"
              alt="Health & Trust"
              width={56}
              height={56}
            />
          </div>
        </div>
        <div className={styles.OrganicPromisesTextContent}>
          <div className={styles.OrganicPromisesName}>Health & Trust</div>
          <div className={styles.OrganicPromisesDescription}>
            Crafted for every lifestyle vegan, gluten-free, diabetic-friendly, and more.
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganicPromises;
