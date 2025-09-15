import Link from "next/link"
import styles from "../../styles/Footer.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    {/* Useful Links Section */}
                    <div className={styles.section}>
                        <h3>Useful Links</h3>
                        <div className={styles.linksGrid}>
                            <div className={styles.linkColumn}>
                                <Link href="/blog">Blog</Link>
                                <Link href="/privacy">Privacy</Link>
                                <Link href="/terms">Terms</Link>
                                <Link href="/faqs">FAQs</Link>
                                <Link href="/security">Security</Link>
                                <Link href="/contact">Contact</Link>
                            </div>
                            <div className={styles.linkColumn}>
                                <Link href="/partner">Partner</Link>
                                <Link href="/franchise">Franchise</Link>
                                <Link href="/seller">Seller</Link>
                                <Link href="/warehouse">Warehouse</Link>
                                <Link href="/deliver">Deliver</Link>
                                <Link href="/resources">Resources</Link>
                            </div>
                            <div className={styles.linkColumn}>
                                <Link href="/recipes">Recipes</Link>
                                <Link href="/bistro">Bistro</Link>
                                <Link href="/district">District</Link>
                            </div>
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div className={styles.section}>
                        <div className={styles.categoriesHeader}>
                            <h3>Categories</h3>
                            <Link href="/categories" className={styles.seeAllLink}>
                                see all
                            </Link>
                        </div>
                        <div className={styles.linksGrid}>
                            <div className={styles.linkColumn}>
                                <Link href="/vegetables-fruits">Vegetables & Fruits</Link>
                                <Link href="/cold-drinks-juices">Cold Drinks & Juices</Link>
                                <Link href="/bakery-biscuits">Bakery & Biscuits</Link>
                                <Link href="/dry-fruits-masala-oil">Dry Fruits, Masala & Oil</Link>
                                <Link href="/paan-corner">Paan Corner</Link>
                                <Link href="/pharma-wellness">Pharma & Wellness</Link>
                                <Link href="/personal-care">Personal Care</Link>
                                <Link href="/beauty-cosmetics">Beauty & Cosmetics</Link>
                                <Link href="/kitchen-dining">Kitchen & Dining</Link>
                                <Link href="/books">Books</Link>
                                <Link href="/e-gift-cards">E-Gift Cards</Link>
                            </div>
                            <div className={styles.linkColumn}>
                                <Link href="/dairy-breakfast">Dairy & Breakfast</Link>
                                <Link href="/instant-frozen-food">Instant & Frozen Food</Link>
                                <Link href="/sweet-tooth">Sweet Tooth</Link>
                                <Link href="/sauces-spreads">Sauces & Spreads</Link>
                                <Link href="/organic-premium">Organic & Premium</Link>
                                <Link href="/cleaning-essentials">Cleaning Essentials</Link>
                                <Link href="/ice-creams-frozen-desserts">Ice Creams & Frozen Desserts</Link>
                                <Link href="/fashion-accessories">Fashion & Accessories</Link>
                                <Link href="/electronics-electricals">Electronics & Electricals</Link>
                                <Link href="/toys-games">Toys & Games</Link>
                                <Link href="/rakhi-gifts">Rakhi Gifts</Link>
                            </div>
                            <div className={styles.linkColumn}>
                                <Link href="/munchies">Munchies</Link>
                                <Link href="/tea-coffee-health-drinks">Tea, Coffee & Health Drinks</Link>
                                <Link href="/atta-rice-dal">Atta, Rice & Dal</Link>
                                <Link href="/chicken-meat-fish">Chicken, Meat & Fish</Link>
                                <Link href="/baby-care">Baby Care</Link>
                                <Link href="/home-office">Home & Office</Link>
                                <Link href="/pet-care">Pet Care</Link>
                                <Link href="/magazines">Magazines</Link>
                                <Link href="/stationery-needs">Stationery Needs</Link>
                                <Link href="/print-store">Print Store</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className={styles.bottomSection}>
                    <div className={styles.bottomGrid}>
                        {/* Copyright */}
                        <div className={styles.copyright}>© Organic Farms, 2025</div>

                        {/* Download App */}
                        <div className={styles.downloadSection}>
                            <span className={styles.downloadText}>Download App</span>
                            <div className={styles.appButtons}>
                                <Link href="#" className={styles.appButton}>
                                    <svg className={styles.appIcon} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>

                                    <svg version="1.1" id="Layer_9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" ><path fill-rule="evenodd" clip-rule="evenodd" fill="#ffffffff" d="M304,112.003c0,8.844-7.18,16.004-16.008,16.004c-8.844,0-16-7.16-16-16.004s7.156-16,16-16C296.82,96.003,304,103.159,304,112.003L304,112.003z M207.984,112.003c0,8.844-7.156,16.004-16,16.004c-8.828,0-15.984-7.16-15.984-16.004s7.156-16,15.984-16C200.828,96.003,207.984,103.159,207.984,112.003L207.984,112.003z M433.93,337.937l-0.016-0.016c-2.906,2.906-6.922,4.719-11.352,4.719c-8.883,0-16.078-7.195-16.078-16.078c0-4.75,2.117-8.984,5.422-11.93c2.508-2.836,4.086-6.531,4.086-10.617v-96.02c0-8.824-7.156-16-16-16c-8.828,0-16,7.176-16,16v96.02v45.062v2.92c0,20.922-10.086,39.414-25.602,51.094c-0.055,0.055-0.094,0.18-0.164,0.234c-3.781,2.922-6.242,7.516-6.242,12.68v48.008c0,26.492-21.492,47.984-47.984,47.984c-26.516,0-48.008-21.492-48.008-47.984v-0.805v-35.203c0-6.633-5.359-12-12-12h-8c-6.625,0-12,5.367-12,12v35.203v0.805c0,26.492-21.5,47.984-47.992,47.984c-26.516,0-48.008-21.492-48.008-47.984v-48.008c0-5.164-2.438-9.758-6.242-12.68c-0.07-0.055-0.102-0.18-0.164-0.234c-15.516-11.68-25.594-30.172-25.594-51.094v-2.922c-5.031,1.797-10.375,2.922-16,2.922c-26.5,0-47.992-21.492-47.992-47.984v-96.02c0-25.383,19.805-45.957,44.758-47.664c1.047-0.215,2.117-0.32,3.234-0.32h16h32h78h34H304c17.664,0,32-14.336,32-32.004c0-6.801-2.172-13.062-5.773-18.227c-20.398-27.734-53.172-45.781-90.234-45.781c-44.258,0-82.484,25.688-100.656,62.949l-0.039-0.02c-2.617,5.348-8.07,9.078-14.43,9.078c-8.906,0-16.125-7.23-16.125-16.129c0-3.945,1.469-7.516,3.828-10.312c11.812-22.676,29.469-41.82,50.961-55.418l-17.398-30.137c-4.414-7.66-1.797-17.438,5.859-21.867c7.648-4.414,17.438-1.797,21.859,5.863l18.562,32.148c14.891-5.238,30.875-8.145,47.578-8.145c16.68,0,32.648,2.996,47.539,8.219l18.602-32.223c4.43-7.66,14.203-10.277,21.867-5.863c7.641,4.43,10.258,14.207,5.852,21.867l-17.461,30.227c15.359,9.707,28.867,22.066,39.594,36.688c7.484,10.496,12,23.23,12,37.082c0,35.34-28.648,63.988-63.984,63.988H143.992h-16h-48c-8.828,0-16.008,7.176-16.008,16v96.02c0,8.82,7.18,16,16.008,16c8.844,0,16-7.18,16-16v-64.012c0-8.828,7.156-16.004,16-16.004s16,7.176,16,16.004v111.996c0,11.984,6.656,22.297,16.398,27.789c9.367,5.617,15.602,15.789,15.602,27.469v56.758c0,8.828,7.164,15.984,16.008,15.984c8.828,0,15.984-7.156,15.984-15.984v-40.008c0-22.102,17.922-40,40.008-40h16c22.102,0,40,17.898,40,40v40.008c0,8.828,7.164,15.984,16.008,15.984c8.82,0,16-7.156,16-15.984v-56.758c0-11.68,6.227-21.852,15.609-27.469c9.719-5.492,16.375-15.805,16.375-27.789v-47.984v-80.016v-16.004c0-26.496,21.492-47.984,48.008-47.984S448,181.499,448,207.995v96.02C448,317.272,442.617,329.257,433.93,337.937L433.93,337.937z" /></svg>

                                    <div className={styles.appButtonText}>
                                        <div className={styles.appButtonSubtext}>Click Here to</div>
                                        <div className={styles.appButtonMaintext}>Download</div>
                                    </div>
                                </Link>

                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className={styles.socialIcons}>
                            <Link href="#" className={styles.socialIcon}>
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                                </svg>
                            </Link>
                            <Link href="#" className={styles.socialIcon}>
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </Link>
                            <Link href="#" className={styles.socialIcon}>
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>
                            <Link href="#" className={styles.socialIcon}>
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </Link>
                            <Link href="#" className={styles.socialIcon}>
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.188 4.72-1.292 1.288-2.896 2.005-4.81 2.15-.95.072-1.906-.022-2.81-.28-.45-.129-.883-.297-1.29-.5v-.005c-.407-.203-.79-.442-1.146-.715-.712-.546-1.29-1.207-1.704-1.95-.207-.372-.379-.762-.513-1.167-.134-.405-.23-.822-.287-1.245-.114-.846-.097-1.713.051-2.555.074-.421.186-.832.335-1.224.149-.392.335-.764.555-1.115.44-.702 1.019-1.31 1.704-1.79.342-.24.708-.447 1.09-.617.382-.17.781-.304 1.19-.4.818-.192 1.677-.2 2.497-.024.41.088.81.215 1.19.38.38.165.74.369 1.075.608.67.478 1.235 1.091 1.66 1.808.213.359.39.738.528 1.133.138.395.237.808.296 1.229.118.842.097 1.705-.063 2.545z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className={styles.disclaimer}>
                    <p>
                        "Organic Farms" is owned & managed by "Organic Farms" and is not related, linked or
                        interconnected in whatsoever manner or nature, to "GROFFR.COM" which is a real estate services business
                        operated by "Redstone Consultancy Services Private Limited".
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
