"use client";

import React from 'react';
import "./story.css";
import Footer from '../../components/footer/footer';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import posts from '../../data/data.json';

const Page: React.FC = () => {

    return (
        <>
            <div className="story">
                <section className="story__section story__intro">
                    <div className="story__container">
                        <div className="story__headings">
                            <h2 className="story__title">
                                A clearer world, one frame at a time.
                            </h2>
                            <p className="story__text">
                                At Framelane, we believe that eyewear is more than just a necessity — it’s a form of
                                self-expression, a daily ritual, and a quiet confidence you carry with you everywhere.
                                That’s why we set out to create a brand where craftsmanship, comfort,
                                and character come together in every pair of frames.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="story__section story__design">
                    <div className="story__container">
                        <div className="story__headings">
                            <h2 className="story__title">
                                Design with depth
                            </h2>
                            <Image
                                src="/icons/glasses-icon.svg"
                                alt="Design with depth"
                                width={100}
                                height={100}
                            />
                            <p className="story__text">
                                Every pair of Framelane frames is designed in-house with intention and care.
                                We draw inspiration from architecture, everyday beauty, and the diverse personalities
                                of the people who wear our glasses. From bold silhouettes to understated classics,
                                our collection is made to fit all faces and all moods.
                                We work exclusively with trusted artisans and manufacturers who share our values —
                                prioritizing durability, fair labor, and eco-conscious practices.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="story__section story__people">
                    <div className="story__people-info">
                        <div className="story__wrapper">
                            <div className="people--title">
                                <h2 className="story__title">Our People</h2>
                            </div>
                            <div className="story__text">
                                <p> Framelane evolves through
                                    collaborations with a diverse
                                    network of creatives — from illustrators and designers to local cultural voices.
                                    These partnerships shape the character of the brand, bring new perspectives to our
                                    work,
                                    and reflect a shared appreciation for originality and self-expression.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="story__people-image-wrapper">
                        <img className="story__people-image" src="/background/story__people-image.jpg" alt="girl with glasses"/>
                    </div>
                </section>

                <section className="story__section story__spaces">
                    <div className="story__spaces-image-wrapper">
                        <img className="story__spaces-image" src="/background/story__spaces-image.jpg"
                             alt="girl with glasses"
                        />
                    </div>

                    <div className="story__spaces-info">
                        <div className="story__wrapper">
                            <div className="people--title">
                                <h2 className="story__title">Our Spaces</h2>
                            </div>
                            <div className="story__text">
                                <p> Framelane spaces are designed with intention — bright, balanced, and thoughtfully composed.
                                    Each location reflects our philosophy: clarity, comfort, and style throughout the eyewear experience.
                                    The interiors blend modern structure with a warm, calm atmosphere that supports thoughtful discovery.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="story__section story__posts">
                    <div className="story__wrapper">
                        <div className="people--title story__posts-title">
                            <h2 className="story__title ">You bring out our best</h2>
                        </div>
                    </div>

                    <div className="story__people-list">
                        <Stack
                            direction="row"
                            spacing={0}
                        >
                            {posts.map((post, index) => (
                                <div key={index} className="story__people-list-image-wrapper">
                                    <img className="story__people-list-image" src={post.img}
                                         alt={post.title}
                                    />
                                    <h3 className="story__people-list-title">{post.title}</h3>
                                </div>
                            ))}
                        </Stack>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
    );
};

export default Page;
