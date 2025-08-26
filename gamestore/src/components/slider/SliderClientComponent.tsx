'use client'

import '@/components/slider/slider.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { productConfig } from '../../config/pages.config';
import uniqueBy from "../../utils/UniqueBy"
import Link from "next/link";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

type SliderProps = {
    image: string;
    product: any;
    review: string;
    name: string;
    email?: string;
}

export default function Slider({slides} : {slides: SliderProps[]}) {

    const uniqueSlides = uniqueBy(slides,["email", "review", "product.image", "name"])
    const limitedSlides = uniqueSlides.slice(0, 15);

    return (
        <div className="slider-wrapper">
            <div className="slider-wrapper__title">
                <h2>Our customers love us</h2>
            </div>
            <div className="slider-wrapper__subtitle">
                <h2>from {slides.length} Reviews</h2>
            </div>

            <Swiper
                className="custom-swiper"
                spaceBetween={10}
                slidesPerView={4}
                slidesPerGroup={4}
                navigation={true}
                pagination={true}
                modules={[Navigation]}
            >
                {limitedSlides?.map((slide, index) => (
                        <SwiperSlide
                            key={index}>
                            <Card
                                className="slider-wrapper__card"
                                sx={{
                                    cursor: 'pointer',
                                    boxShadow: 'unset',
                                    padding: 'unset'
                                }}>
                                <Link href={`/${productConfig.PRODUCT}/${slide.product.slug}`} key={index} target="_blank">
                                    <CardMedia
                                        className="slide"
                                        component="img"
                                        sx={{height: 310}}
                                        image={slide.product.image}
                                    />
                                    {Array.from({length: 5}).map((_, index) => (
                                        <StarRateRoundedIcon
                                            key={index}
                                            fontSize="small"
                                            className={`star ${index < Math.round(slide.rating ?? 0) ? 'is-on': ''}`}
                                        />
                                    ))}
                                <CardContent>
                                    <Typography
                                        sx={{
                                            fontStyle: 'italic',
                                            color: '#333',
                                            fontSize: '16px',
                                            marginBottom: '12px',
                                        }}
                                        gutterBottom variant="h5"
                                        component="div">
                                        {slide.review}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#777',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }}
                                        variant="h5"
                                        component="div">
                                        {slide.name}
                                    </Typography>
                                </CardContent>
                                </Link>
                            </Card>
                        </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
