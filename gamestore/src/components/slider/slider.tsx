'use client'

import React from 'react';
import '@/components/slider/slider.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

const Slider: React.FC = () => {

    const sliders = [
        {
            image: "https://i.pinimg.com/1200x/25/2e/2f/252e2f28384fa20ce8ea099a5c2dac21.jpg",
            review: "Absolutely love these glasses! " +
                "They’re stylish, lightweight, and I get compliments all the time. " +
                "Will definitely order again.",
            user: "Emma T."
        },
        {
            image: "https://i.pinimg.com/1200x/4e/36/08/4e36088e1fcb93403c83864320f33df6.jpg",
            review: "Great fit and clear lenses. " +
                "Shipping took a bit longer than expected, but the quality makes up for it.",
            user: "Daniel R."
        },
        {
            image: "https://moscot.com/cdn/shop/products/hyman-color-black-pos-2.jpg?v=1691335558&width=1024",
            review: "These glasses exceeded my expectations. " +
                "Super comfortable and perfect for everyday use. Highly recommend.",
            user: "Sarah L."
        },
        {
            image: "https://moscot.com/cdn/shop/files/golda-color-light-blue-pos-2.jpg?v=1728595665&width=2295",
            review: "They look good, but I wish the frame felt a bit sturdier. Still decent for the price.",
            user: "Michael B."
        },
        {
            image: "https://www.darlingstopt.com.au/wp-content/uploads/2024/03/moscot-dahven.jpg",
            review: "Stylish and affordable! I bought two pairs—one for home, one for work. Love them both!",
            user: "Olivia M."
        },
        {
            image: "https://www.darlingstopt.com.au/wp-content/uploads/2024/03/moscot-dahven.jpg",
            review: "Good quality and accurate prescription. Frame is slightly tighter than I’d like, but still wearable.",
            user: "James K."
        },
        {
            image: "https://i.pinimg.com/736x/49/47/be/4947be3d2d9df0f3c6b0b8e837985fd6.jpg",
            review: "Beautiful design and very flattering. I’ve never liked wearing glasses until now!",
            user: "Chloe S."
        },
        {
            image: "https://i.pinimg.com/736x/02/d7/bf/02d7bf0fa9c451394ad1d1dc13a62cd9.jpg",
            review: "The style is nice but the lenses get smudgy quite easily. They’re okay for backup glasses.",
            user: "Sophia"
        },
        {
            image: "https://i.pinimg.com/1200x/cc/a6/24/cca6248f63c4838c13f7610749052bb7.jpg",
            review: "Perfect fit and super clear lenses. I wear them all day without discomfort. 10/10!",
            user: "Liam P."
        },
        {
            image: "https://i.pinimg.com/736x/d6/70/f4/d670f4c4bfacfa8c99e139594784ea21.jpg",
            review: "Very happy with my purchase. They look just like the photos and feel very premium. Great value!",
            user: "Ethan"
        },

    ]

    return (
        <div className="slider-wrapper">
            <div className="slider-wrapper__title">
                <h2>Our customers love us</h2>
            </div>
            <div className="slider-wrapper__subtitle">
                <h2>from 15 Reviews</h2>
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
                {sliders.map((slide, index) => (
                    <SwiperSlide
                        key={index}>
                        <Card
                            className="slider-wrapper__card"
                            sx={{
                                cursor: 'pointer',
                                boxShadow: 'unset',
                                padding: 'unset'
                            }}>
                            <CardMedia
                                className="slide"
                                component="img"
                                sx={{height: 310}}
                                image={slide.image}
                            />
                            <Rating
                                name="text-feedback"
                                readOnly
                                precision={0.5}
                                emptyIcon={
                                <StarIcon
                                    style={{
                                        opacity: 0.55,
                                        marginTop: 20,
                                        color: '#000',
                                        fontSize: '20px'
                                }}/>
                            }
                            />
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
                                    {slide.user}
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