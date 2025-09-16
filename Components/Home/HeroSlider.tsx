"use client"

import { useState, useEffect } from "react"
import styles from "../../styles/Home.module.css"

function HeroSlider() {
  const slides: any = {
    data: [
      {
        id: 1,
        name: "Slide 1",
        url_key: "slide-1",
        cms_block_editior: {
          time: 1757576386553,
          blocks: [
            {
              id: "zV7CtFjyZ7",
              type: "header",
              data: {
                text: "I'm the first Box (Organic Food)",
                level: 2,
              },
            },
            {
              id: "CUQxEl7o1B",
              type: "paragraph",
              data: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci pellentesque eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus. ",
              },
            },
            {
              id: "HiS699tiQ4",
              type: "code",
              data: {
                code: '<a href="/expolre"> Explore Now </a> ',
              },
            },
            {
              id: "YYaQlkVnoz",
              type: "image",
              data: {
                caption: "",
                withBorder: false,
                withBackground: false,
                stretched: false,
                file: {
                  width: 740,
                  height: 494,
                  size: "126533",
                  name: "fresh-vegetables-food.jpg",
                  title: "Fresh Vegetables Food",
                  extension: "jpg",
                  fileId: "324684e5-a949-47eb-bf19-b8b68c918275",
                  fileURL: "/files/324684e5-a949-47eb-bf19-b8b68c918275",
                  url: "/assets/324684e5-a949-47eb-bf19-b8b68c918275",
                },
              },
            },
          ],
          version: "2.31.0-rc.7",
        },
      },
      {
        id: 2,
        name: "Slide 2",
        url_key: "slide-2",
        cms_block_editior: {
          time: 1757576346712,
          blocks: [
            {
              id: "84p6cDODU1",
              type: "header",
              data: {
                text: "I'm the Second Box - (Gluten Free Food)",
                level: 2,
              },
            },
            {
              id: "rkW46Ocs1p",
              type: "paragraph",
              data: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci pellentesque eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus. ",
              },
            },
            {
              id: "QMWdg6Q1qK",
              type: "code",
              data: {
                code: '<a href="/shop-now"> Shop Now </a> ',
              },
            },
            {
              id: "DJ5M9nSjvs",
              type: "image",
              data: {
                caption: "",
                withBorder: false,
                withBackground: false,
                stretched: false,
                file: {
                  width: 612,
                  height: 382,
                  size: "75026",
                  name: "istockphoto-673511620-612x612.jpg",
                  title: "Istockphoto 673511620 612x612",
                  extension: "jpg",
                  fileId: "4e991dce-5112-4b23-9a9b-e5c7a3786654",
                  fileURL: "/files/4e991dce-5112-4b23-9a9b-e5c7a3786654",
                  url: "/assets/4e991dce-5112-4b23-9a9b-e5c7a3786654",
                },
              },
            },
          ],
          version: "2.31.0-rc.7",
        },
      },
      {
        id: 3,
        name: "Slide 3",
        url_key: "slide-3",
        cms_block_editior: {
          time: 1757576621454,
          blocks: [
            {
              id: "q56kxMGaQE",
              type: "header",
              data: {
                text: "I'm the third Box (Lactos Free Food)",
                level: 2,
              },
            },
            {
              id: "_woCB4KgMC",
              type: "paragraph",
              data: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci pellentesque eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus.",
              },
            },
            {
              id: "ORiKArxMVf",
              type: "code",
              data: {
                code: '<a href="/buynow"> Buy Now </a> ',
              },
            },
            {
              id: "BnNy7-rcy2",
              type: "image",
              data: {
                caption: "",
                withBorder: false,
                withBackground: false,
                stretched: false,
                file: {
                  width: 612,
                  height: 408,
                  size: "56850",
                  name: "istockphoto-489380182-612x612.jpg",
                  title: "Istockphoto 489380182 612x612",
                  extension: "jpg",
                  fileId: "495eda47-7702-4ff6-aaa3-fd4d40ea7862",
                  fileURL: "/files/495eda47-7702-4ff6-aaa3-fd4d40ea7862",
                  url: "/assets/495eda47-7702-4ff6-aaa3-fd4d40ea7862",
                },
              },
            },
          ],
          version: "2.31.0-rc.7",
        },
      },
      {
        id: 4,
        name: "Slide 4",
        url_key: "slide-4",
        cms_block_editior: {
          time: 1757577232340,
          blocks: [
            {
              id: "MyR5zapCHl",
              type: "header",
              data: {
                text: "I'm the fourth Box (Preservatives Free Food)",
                level: 2,
              },
            },
            {
              id: "NzRedUGozB",
              type: "paragraph",
              data: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci pellentesque eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus.",
              },
            },
            {
              id: "RjXuqNCC3k",
              type: "paragraph",
              data: {
                text: " ",
              },
            },
            {
              id: "p1bWcOOuTE",
              type: "code",
              data: {
                code: '<a href="/purchase-now"> Purchase Now </a> ',
              },
            },
            {
              id: "cR9ibGcMmK",
              type: "image",
              data: {
                caption: "",
                withBorder: false,
                withBackground: false,
                stretched: false,
                file: {
                  width: 1426,
                  height: 980,
                  size: "50150",
                  name: "preservatives-free-natural-organic-food-package-label-no-additives-no-preservatives-natural-food-illustration-free-vector.jpg",
                  title:
                    "Preservatives Free Natural Organic Food Package Label No Additives No Preservatives Natural Food Illustration Free Vector",
                  extension: "jpg",
                  fileId: "bd271de0-cb12-4303-b3e9-708b6c458544",
                  fileURL: "/files/bd271de0-cb12-4303-b3e9-708b6c458544",
                  url: "/assets/bd271de0-cb12-4303-b3e9-708b6c458544",
                },
              },
            },
          ],
          version: "2.31.0-rc.7",
        },
      },
      {
        id: 5,
        name: "Slide 5",
        url_key: "slide-5",
        cms_block_editior: {
          time: 1757577364212,
          blocks: [
            {
              id: "MxiPAGyoFR",
              type: "header",
              data: {
                text: "I'm the fifth Box (Sugar Free Food)",
                level: 2,
              },
            },
            {
              id: "CQDzXm1LRj",
              type: "paragraph",
              data: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus. Donec scelerisque ipsum diam, ac mattis orci pellentesque eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia dui lectus.",
              },
            },
            {
              id: "pmiJnTQlkQ",
              type: "code",
              data: {
                code: '<a href="/get-now"> Get Now </a> ',
              },
            },
            {
              id: "Qx8OzjMCcE",
              type: "image",
              data: {
                caption: "",
                withBorder: false,
                withBackground: false,
                stretched: false,
                file: {
                  width: 612,
                  height: 408,
                  size: "42560",
                  name: "istockphoto-1188736890-612x612.jpg",
                  title: "Istockphoto 1188736890 612x612",
                  extension: "jpg",
                  fileId: "2be692f1-e656-4c81-b2bc-04ba3e4a8089",
                  fileURL: "/files/2be692f1-e656-4c81-b2bc-04ba3e4a8089",
                  url: "/assets/2be692f1-e656-4c81-b2bc-04ba3e4a8089",
                },
              },
            },
          ],
          version: "2.31.0-rc.7",
        },
      },
    ],
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.data.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.data.length) % slides.data.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getCurrentSlideData = () => {
    const slide = slides.data[currentSlide]
    const blocks = slide.cms_block_editior.blocks

    const header = blocks.find((block: any) => block.type === "header")?.data.text || ""
    const paragraph = blocks.find((block: any) => block.type === "paragraph")?.data.text || ""
    const codeBlock = blocks.find((block: any) => block.type === "code")?.data.code || ""
    const image = blocks.find((block: any) => block.type === "image")?.data.file || null

    return { header, paragraph, codeBlock, image }
  }

  const { header, paragraph, codeBlock, image } = getCurrentSlideData()

  return (
    <div
      className={styles.heroSlider}
      style={{
        backgroundImage: image ? `url(${process.env.baseURL}${image.url})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.sliderContainer}>
        {/* Navigation Arrows */}
        <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={prevSlide} disabled={isTransitioning}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={nextSlide} disabled={isTransitioning}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Slide Content */}
        <div className={styles.slideContent}>
          <div className={styles.textContent}>
            <h2 className={styles.slideTitle}>{header}</h2>
            <p className={styles.slideDescription}>{paragraph}</p>
            {codeBlock && <div className={styles.slideButton} dangerouslySetInnerHTML={{ __html: codeBlock }} />}
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageCard}>
              {image && (
                <img
                  src={`/abstract-geometric-shapes.png?height=300&width=400&query=${image.title || "Food Image"}`}
                  alt={image.title || "Slide Image"}
                  className={styles.slideImage}
                />
              )}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className={styles.progressIndicators}>
          <div className={styles.progressLine}></div>
          {slides.data.map((_: any, index: number) => (
            <button
              key={index}
              className={`${styles.progressDot} ${index === currentSlide ? styles.active : ""}`}
              onClick={() => goToSlide(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
