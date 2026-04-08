"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs, FreeMode, Zoom, Pagination, Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/thumbs"
import "swiper/css/free-mode"
import "swiper/css/zoom"
import "swiper/css/pagination"
import "swiper/css/navigation"
import styles from "../../styles/ProductDetails.module.css"

function ProductGallery({ thumbnail, images }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const swiperRef = useRef<SwiperType | null>(null)

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // ✅ Combine thumbnail + images
  const galleryImages = useMemo(() => {
    const validImages = Array.isArray(images) ? images.filter(Boolean) : []

    const normalized = validImages
      .map((img: any) => {
        if (typeof img === "string") return img
        if (img?.file) return img.file
        if (img?.id) return img.id
        return null
      })
      .filter(Boolean)

    const allImages = thumbnail ? [thumbnail, ...normalized] : normalized
    return allImages.length > 0 ? allImages : ["/Images/HeroImage.png"]
  }, [thumbnail, images])

  const getImageSrc = (img: string) => {
    if (!img) return "/Images/HeroImage.png"
    if (img.startsWith("/Images/") || img.startsWith("http")) return img
    return `${process.env.baseURL}/assets/${img}`
  }

  return (
    <div className={styles.productGallery}>
      {/* 🔹 Main Gallery */}
      <div className={styles.mainGallery}>
        <Swiper
          spaceBetween={10}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          thumbs={
            !isMobile
              ? {
                  swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }
              : undefined
          }
          modules={[Thumbs, Zoom, Pagination]}
          className={styles.mainSwiper}
          zoom={{ maxRatio: 3, toggle: true }}
          pagination={isMobile ? { clickable: true } : false}
        >
          {galleryImages.map((image: any, index: number) => (
            <SwiperSlide key={index}>
              <div className={`${styles.mainImageContainer} swiper-zoom-container`}>
                <img
                  src={getImageSrc(image)}
                  alt={`Product image ${index + 1}`}
                  className={styles.mainImage}
                  onError={(e) => (e.currentTarget.src = "/Images/HeroImage.png")}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔹 Thumbnail Gallery (only for desktop) */}
      {!isMobile && (
        <div className={styles.thumbnailGalleryWrapper}>
          {/* Left and right arrows */}
          <button
            className={`${styles.thumbNavButton} ${styles.thumbPrev}`}
            style={{ opacity: isBeginning ? 0 : 1, pointerEvents: isBeginning ? "none" : "auto" }}
          >
            ‹
          </button>

          <Swiper
            onSwiper={(swiper) => {
              setThumbsSwiper(swiper)
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning)
              setIsEnd(swiper.isEnd)
            }}
            spaceBetween={10}
            slidesPerView={4.5}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs, Navigation]}
            navigation={{
              nextEl: `.${styles.thumbNext}`,
              prevEl: `.${styles.thumbPrev}`,
            }}
            className={styles.thumbSwiper}
          >
            {galleryImages.map((image: any, index: number) => (
              <SwiperSlide key={index}>
                <div
                  className={`${styles.thumbnailContainer} ${
                    index === activeIndex ? styles.activeThumbnail : ""
                  }`}
                >
                  <img
                    src={getImageSrc(image)}
                    alt={`Thumbnail ${index + 1}`}
                    className={styles.thumbnailImage}
                    onError={(e) => (e.currentTarget.src = "/Images/HeroImage.png")}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`${styles.thumbNavButton} ${styles.thumbNext}`}
            style={{ opacity: isEnd ? 0 : 1, pointerEvents: isEnd ? "none" : "auto" }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGallery
