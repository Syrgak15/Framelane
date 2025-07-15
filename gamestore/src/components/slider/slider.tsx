'use client'

import React from 'react';
import '@/components/slider/slider.css';
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

const Slider: React.FC = () => {

    const slides = [
        '/background/banner_bg-zero.webp',
        '/background/banner_bg-first.webp',
        '/background/banner_bg-second.webp',
        'https://moscot.com/cdn/shop/products/hyman-color-black-pos-2.jpg?v=1691335558&width=1024',
        'https://moscot.com/cdn/shop/files/golda-color-light-blue-pos-2.jpg?v=1728595665&width=2295',
        '/background/banner_bg-second.webp',
        '/background/banner_bg-second.webp',
        '/background/banner_bg-second.webp',
        '/background/banner_bg-second.webp',
        'https://www.darlingstopt.com.au/wp-content/uploads/2024/03/moscot-dahven.jpg',
        'https://www.darlingstopt.com.au/wp-content/uploads/2024/03/moscot-dahven.jpg'
    ];

    return (
        <div className="sliderWrapper">
            <div className="sliderWrapper__title">
                <h2>Our customers love us</h2>
                <h3>from 15 reviews</h3>
            </div>

            <Swiper
                className="customSwiper"
                spaceBetween={10}
                slidesPerView={3}
                slidesPerGroup={3}
                navigation={true}
                pagination={true}
                modules={[Navigation]}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}>
                        <Card
                            className="sliderWrapper__card"
                            sx={{
                                cursor: 'pointer',
                                boxShadow: 'unset'
                            }}>
                            <CardMedia
                                className="slide"
                                sx={{height: 310 }}
                                image={slide}
                                title="green iguana"
                            />
                            <Rating
                                name="text-feedback"
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon style={{opacity: 0.55, marginTop: 20}} fontSize="inherit"/>}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    322
                                </Typography>
                            <Typography variant="h5" component="div">
                                123
                            </Typography>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;