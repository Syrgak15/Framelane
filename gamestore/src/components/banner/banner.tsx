'use client'
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectFade, Autoplay} from 'swiper/modules';
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/effect-fade';
import '@/components/banner/banner.css';

const Banner: React.FC = () => {

    const slides = [
        '/background/banner_bg-zero.webp',
        '/background/banner_bg-first.webp',
        '/background/banner_bg-second.webp',
    ];


    return (
        <>
            <Swiper
                className="customSwiper"
                modules={[EffectFade, Autoplay]}
                effect="fade"
                pagination={{
                    clickable: true,
                }}
                autoplay={{delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    }}
                loop={true}
                fadeEffect={{crossFade: true}}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="bannerImage">
                            <Image
                                src={slide}
                                alt={'Banner'}
                                width={2000}
                                height={900}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/*<div className={style.bannerContent}>*/}
            {/*    <div className={style.bannerHeading}>*/}
            {/*        <h3 className={style.bannerHeading__tag}>*/}
            {/*            DROPPING SOON*/}
            {/*        </h3>*/}
            {/*        <h2 className={style.bannerHeading__title}>*/}
            {/*            Choose greatness*/}
            {/*        </h2>*/}
            {/*    </div>*/}

            {/*    <div className={style.bannerHeading}>*/}
            {/*        <h2 className={style.bannerHeading__subtitle}>*/}
            {/*            Choose us*/}
            {/*        </h2>*/}
            {/*    </div>*/}

            {/*    <div className={style.bannerBtn}>*/}
            {/*        <button>SHOP NOW</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>

    );
}

export default Banner;