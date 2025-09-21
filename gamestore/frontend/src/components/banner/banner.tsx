'use client'

import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectFade, Autoplay} from 'swiper/modules';
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/effect-fade';
import '@/components/banner/banner.css';
import slides from "../../data/main-page-banner.json";

export default function Banner() {

    return (
        <>
            <Swiper
                className="custom-swiper"
                modules={[EffectFade, Autoplay]}
                effect="fade"
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                loop={true}
                fadeEffect={{crossFade: true}}
            >
                {Array.isArray(slides) && (slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div className="banner-image">
                            <Image
                                src={slide.image}
                                alt={'Banner'}
                                width={2000}
                                height={900}
                            />
                        </div>
                    </SwiperSlide>
                )))}
            </Swiper>

            <div className="banner-slogan">
                <div className="banner-slogan__content">
                    <p>See yourself in a new light — with eyewear that frames your personality, <br/>
                        fuels your confidence,<br/>
                        and redefines your style story.
                    </p>
                </div>
            </div>
        </>
    );
}

