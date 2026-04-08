"use client"

import { useEffect, useState } from "react"
import style from "../../styles/Header.module.css"
import Link from "next/link"
import MiniCart from "../MiniCart/MiniCart"
import { useCart } from "@/context/CartContext"

const placeholders = ['Search "rice"', 'Search "Milk"', 'Search "Bread"']

function Header({ categoriesList }: any) {
     const { cartItems } = useCart();
    const [index, setIndex] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false);


     const items = Object.values(cartItems);

  const itemsTotal = items.reduce(
    (sum: number, item: any) => sum + item.final_price * item.quantity,
    0
  );

  const handlingCharge = items.length > 0 ? 2 : 0;
  const grandTotal = itemsTotal + handlingCharge;
   
    const totalItems = Object.values(cartItems).reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimating(true)
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % placeholders.length)
                setAnimating(false)
            }, 350)
        }, 2000)
        return () => clearInterval(timer)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    // Filter parent categories only
    const parentCategories = categoriesList?.data?.filter((cat: any) => cat.parent_category === null)

    // Map subcategories under parent
    const getSubCategories = (parentId: string) => {
        return categoriesList?.data?.filter((cat: any) => cat.parent_category === parentId)
    }

    return (
        <>
            <header className={style.header}>
                {/* Top Header */}
                <div className={style.topHeader}>
                    <div className={style.logoSection}>
                        <Link href='/'>
                            <span className={style.logoBold}>Organic</span>
                            <span className={style.logoScript}>Farms</span>
                        </Link>
                        {/* Location Selector - Hidden on mobile */}
                        <div className={style.locationSection}>
                            <div className={style.locationSelect}>
                                <svg className={style.locationIcon} width="17" height="17" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                        stroke="#000000ff"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                                <span>Select Location</span>
                            </div>
                        </div>
                    </div>

                    <nav className={style.navMenu}>
                        <a href="#">Brand's</a>
                        <a href="#">About us</a>
                        <a href="#">Offers</a>
                        <a href="#">Blogs</a>
                    </nav>

                    <div className={style.iconSection}>
                        <div className={style.searchBar}>
                            <svg className={style.searchIcon} width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="#646464" strokeWidth="2" />
                                <line x1="18" y1="18" x2="21" y2="21" stroke="#646464" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <div className={style.inputWrapper}>
                                <input className={style.searchInput} type="text" />
                                <span className={`${style.placeholder} ${animating ? style.flip : ""}`}>{placeholders[index]}</span>
                            </div>
                        </div>

                        <div className={style.desktopIcons}>
                            <span className={style.icon}>
                                <svg width="24" height="24">
                                    <path
                                        d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18z"
                                        stroke="#646464"
                                        fill="none"
                                    />
                                </svg>
                            </span>
                            <span className={style.icon}>
                                <svg width="24" height="24">
                                    <circle cx="12" cy="8" r="4" stroke="#646464" fill="none" />
                                    <path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="#646464" fill="none" />
                                </svg>
                            </span>
                            <span className={style.icon} onClick={() => setIsCartOpen(true)} style={{display:'flex', gap:'5px'}}>
                                <svg
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 128 128"
                                    enableBackground="new 0 0 128 128"
                                >
                                    <g>
                                        <g>
                                            <g>
                                                <path
                                                    fill="#282D33"
                                                    d="M126.004,101.46H48.252c-5.167,0-8.826-1.478-10.875-4.394c-3.105-4.417-1.048-10.288-0.958-10.535l0.144-0.314l6.613-11.591l3.468,1.979L40.131,88.02c-0.229,0.744-1.198,4.339,0.522,6.766c1.261,1.779,3.818,2.683,7.599,2.683h77.752V101.46z"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    fill="#282D33"
                                                    d="M49.309,126.712c-6.513,0-11.811-5.35-11.811-11.926c0-6.575,5.298-11.924,11.811-11.924c6.518,0,11.817,5.349,11.817,11.924C61.126,121.362,55.825,126.712,49.309,126.712z M49.312,106.854c-4.315,0-7.822,3.559-7.822,7.932c0,4.374,3.507,7.934,7.818,7.934c4.315,0,7.825-3.56,7.825-7.934C57.134,110.413,53.625,106.854,49.312,106.854z"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    fill="#282D33"
                                                    d="M110.131,126.712c-6.513,0-11.812-5.35-11.812-11.926c0-6.575,5.299-11.924,11.812-11.924c6.518,0,11.816,5.349,11.816,11.924C121.947,121.362,116.646,126.712,110.131,126.712z M110.135,106.854c-4.315,0-7.823,3.559-7.823,7.932c0,4.374,3.508,7.934,7.819,7.934c4.315,0,7.824-3.56,7.824-7.934C117.955,110.413,114.447,106.854,110.135,106.854z"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    fill="#282D33"
                                                    d="M128,77.166H28.258L17.1,7.417L0,5.248l0.502-3.96L20.57,3.833l3.319,20.749H128V77.166z M31.662,73.174h92.346v-44.6h-99.48L31.662,73.174z"
                                                />
                                            </g>
                                        </g>
                                        <g>
                                            <rect x="40.317" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                        <g>
                                            <rect x="57.077" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                        <g>
                                            <rect x="73.835" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                        <g>
                                            <rect x="90.595" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                        <g>
                                            <rect x="107.354" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                    </g>
                                </svg>
                                {totalItems > 0 && (
                                    <span className={style.cartBadge}>
                                      <p>{totalItems} Items</p> 
                                      <p>₹{grandTotal.toLocaleString("en-IN")}</p>
                                    </span>
                                )}
                            </span>
                        </div>

                        <button className={style.hamburger} onClick={toggleMobileMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>

                <div className={style.bottomNav}>
                    {parentCategories?.map((category: any, index: number) => {
                        const subCategories = getSubCategories(category.id)

                        return (
                            <div key={index} className={style.dropdown}>
                                <Link href={`/${category.slug}`} className={style.parentLink}>
                                    {category.category_name}
                                </Link>

                                {subCategories.length > 0 && (
                                    <div className={style.dropdownMenu}>
                                        {subCategories.map((sub: any) => (
                                            <Link key={sub.id} href={`/${category.slug}/${sub.slug}`} className={style.subLink}>
                                                {sub.category_name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </header>

            {isMobileMenuOpen && <div className={style.mobileOverlay} onClick={closeMobileMenu}></div>}

            <div className={`${style.mobileMenu} ${isMobileMenuOpen ? style.mobileMenuOpen : ""}`}>
                <div className={style.mobileMenuHeader}>
                    <h3>Menu</h3>
                    <button className={style.closeButton} onClick={closeMobileMenu}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <line x1="18" y1="6" x2="6" y2="18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                            <line x1="6" y1="6" x2="18" y2="18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className={style.mobileMenuContent}>
                    {/* Location selector in mobile menu */}
                    <div className={style.mobileLocationSection}>
                        <div className={style.locationSelect}>
                            <svg className={style.locationIcon} width="17" height="17" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                    stroke="#000000ff"
                                    strokeWidth="1.5"
                                />
                            </svg>
                            <span>Select Location</span>
                        </div>
                    </div>

                    {/* Main navigation */}
                    <div className={style.mobileNavSection}>
                        <h4>Navigation</h4>
                        <a href="#" onClick={closeMobileMenu}>
                            Brand's
                        </a>
                        <a href="#" onClick={closeMobileMenu}>
                            About us
                        </a>
                        <a href="#" onClick={closeMobileMenu}>
                            Offers
                        </a>
                        <a href="#" onClick={closeMobileMenu}>
                            Blogs
                        </a>
                    </div>

                    {/* Categories */}
                    <div className={style.mobileCategoriesSection}>
                        <h4>Categories</h4>
                        {parentCategories?.map((category: any, index: number) => {
                            const subCategories = getSubCategories(category.id)

                            return (
                                <div key={index} className={style.mobileCategory}>
                                    <Link href={`/${category.slug}`} className={style.mobileCategoryLink} onClick={closeMobileMenu}>
                                        {category.category_name}
                                    </Link>

                                    {subCategories.length > 0 && (
                                        <div className={style.mobileSubCategories}>
                                            {subCategories.map((sub: any) => (
                                                <Link
                                                    key={sub.id}
                                                    href={`/${category.slug}/${sub.slug}`}
                                                    className={style.mobileSubLink}
                                                    onClick={closeMobileMenu}
                                                >
                                                    {sub.category_name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Mobile icons section */}
                    <div className={style.mobileIconsSection}>
                        <div className={style.mobileIconsGrid}>
                            <div className={style.mobileIconItem}>
                                <svg width="24" height="24">
                                    <path
                                        d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18z"
                                        stroke="#646464"
                                        fill="none"
                                    />
                                </svg>
                                <span>Wishlist</span>
                            </div>
                            <div className={style.mobileIconItem}>
                                <svg width="24" height="24">
                                    <circle cx="12" cy="8" r="4" stroke="#646464" fill="none" />
                                    <path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="#646464" fill="none" />
                                </svg>
                                <span>Profile</span>
                            </div>
                            <div className={style.mobileIconItem}
                                onClick={() => {
                                    setIsCartOpen(true);
                                    closeMobileMenu();
                                }}>
                                <svg
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 128 128"
                                    enableBackground="new 0 0 128 128"
                                >
                                    <g>
                                        <g>
                                            <g>
                                                <path
                                                    fill="#282D33"
                                                    d="M126.004,101.46H48.252c-5.167,0-8.826-1.478-10.875-4.394c-3.105-4.417-1.048-10.288-0.958-10.535l0.144-0.314l6.613-11.591l3.468,1.979L40.131,88.02c-0.229,0.744-1.198,4.339,0.522,6.766c1.261,1.779,3.818,2.683,7.599,2.683h77.752V101.46z"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    fill="#282D33"
                                                    d="M49.309,126.712c-6.513,0-11.811-5.35-11.811-11.926c0-6.575,5.298-11.924,11.811-11.924c6.518,0,11.817,5.349,11.817,11.924C61.126,121.362,55.825,126.712,49.309,126.712z M49.312,106.854c-4.315,0-7.822,3.559-7.822,7.932c0,4.374,3.507,7.934,7.818,7.934c4.315,0,7.825-3.56,7.825-7.934C57.134,110.413,53.625,106.854,49.312,106.854z"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    fill="#282D33"
                                                    d="M110.131,126.712c-6.513,0-11.812-5.35-11.812-11.926c0-6.575,5.299-11.924,11.812-11.924c6.518,0,11.816,5.349,11.816,11.924C121.947,121.362,116.646,126.712,110.131,126.712z M110.135,106.854c-4.315,0-7.823,3.559-7.823,7.932c0,4.374,3.508,7.934,7.819,7.934c4.315,0,7.824-3.56,7.824-7.934C117.955,110.413,114.447,106.854,110.135,106.854z"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    fill="#282D33"
                                                    d="M128,77.166H28.258L17.1,7.417L0,5.248l0.502-3.96L20.57,3.833l3.319,20.749H128V77.166z M31.662,73.174h92.346v-44.6h-99.48L31.662,73.174z"
                                                />
                                            </g>
                                        </g>
                                        <g>
                                            <rect x="40.317" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                        <g>
                                            <rect x="57.077" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                        <g>
                                            <rect x="73.835" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                        <g>
                                            <rect x="90.595" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                        <g>
                                            <rect x="107.354" y="36.652" fill="#282D33" width="3.992" height="28.007" />
                                        </g>
                                    </g>
                                </svg>
                                <span>Cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}

export default Header
