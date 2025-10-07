"use client"

import { useState, useMemo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs, FreeMode } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/thumbs"
import "swiper/css/free-mode"
import styles from "../../styles/ProductDetails.module.css"

function ProductGallery({ thumbnail, images }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0) // ✅ Track active slide

  // ✅ Combine thumbnail + images, ensuring thumbnail appears first
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
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // ✅ Update active slide
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs]}
          className={styles.mainSwiper}
        >
          {galleryImages.map((image: any, index: number) => (
            <SwiperSlide key={index}>
              <div className={styles.mainImageContainer}>
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

      {/* 🔹 Thumbnail Gallery */}
      <div className={styles.thumbnailGallery}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4.5}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
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
      </div>
    </div>
  )
}

export default ProductGallery
