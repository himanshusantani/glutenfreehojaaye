"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "@/styles/Home.module.css";
import { Client } from "@/pages/api/client";

type Slide = {
    id: number;
    name: string;
    url_key: string;
    cms_block_editior: {
        blocks: any[];
    };
};

function HeroSlider({slides}:any) {
    //  const [slides, setSlides] = useState<Slide[]>([]);

//     const client = new Client();
//   useEffect(() => {
//     async function fetchData() {
//       const data = await client.fetchHeroSliderSection();
//       if (data?.data) {
//         setSlides(data.data);
//       }
//     }
//     fetchData();
//   }, []);


    return (
        <div className={styles.heroWrapper}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className={styles.heroSwiper}
            >
                {slides.map((slide: any) => {
                    const headerBlock = slide.cms_block_editior.blocks.find(
                        (b: any) => b.type === "header"
                    );
                    const paragraphBlock = slide.cms_block_editior.blocks.find(
                        (b: any) => b.type === "paragraph"
                    );
                    const codeBlock = slide.cms_block_editior.blocks.find(
                        (b: any) => b.type === "code"
                    );
                    const imageBlock = slide.cms_block_editior.blocks.find(
                        (b: any) => b.type === "image"
                    );

                    return (
                        <SwiperSlide key={slide.id}>
                            <div
                                className={styles.slide}
                                style={{
                                      backgroundImage: `url(${process.env.baseURL}${imageBlock?.data?.file?.url})`, 
                            //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.19)), url('http://34.100.205.229:8055/assets/4e991dce-5112-4b23-9a9b-e5c7a3786654')`,
                                    
                                }}

                            >
                                <div className={styles.overlay}>
                                    {headerBlock && <h1>{headerBlock.data.text}</h1>}
                                    {paragraphBlock && <p>{paragraphBlock.data.text}</p>}
                                    {codeBlock && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: codeBlock.data.code,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default HeroSlider;
