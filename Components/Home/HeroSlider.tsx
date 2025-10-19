"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Removed Navigation
import "swiper/css";
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

function HeroSlider({ slides }: any) {
    return (
        <div className={styles.heroWrapper}>
            <Swiper
                modules={[Pagination, Autoplay]} // Removed Navigation module
                pagination={{ clickable: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
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
