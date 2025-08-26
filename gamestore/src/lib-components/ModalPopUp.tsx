"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReviewsRating from './ReviewsRating';
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {useAppDispatch} from "../../src/store/hooks";
import {postProductReview} from "../features/slices/productPageReducer";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type FormValues = {
    rating: number | null;
    name: string;
    email: string;
    review: string;
    surname: string;
};


export default function BasicModal({slug} : {slug: string}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const dispatch = useAppDispatch()

    const { control, register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: { rating: 0, name: "", email: "", review: "" },
    });


    const onSubmit = async(data: FormValues) => {
        setFormSubmitted(true);
        await dispatch(postProductReview({slug, data}))
        reset({
            rating: null,
            name: '',
            email: '',
            review: '',
            surname: '',
        });
    };

    return (
        <div>
            <Button
                sx={{
                    borderRadius: "5px",
                    border: "1px solid #000",
                    padding: "10px 20px",
                    textTransform: 'capitalize',
                    backgroundColor: 'unset',
                    color: '#000',
                    boxShadow: 'unset',
                    ":hover": {
                        boxShadow: 'unset',
                    }
                }}
                onClick={handleOpen}
                variant="contained"
            >Leave a review</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Leave us a review!
                    </Typography>
                    {!formSubmitted ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="reviews__widget-form">
                            <input
                                placeholder="Enter an email address"
                                className="reviews__input"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            <input
                                placeholder="Enter your name"
                                className="reviews__input"
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            <input
                                placeholder="Write your surname"
                                className="reviews__input"
                                type="text"
                                {...register("surname", {
                                    required: "Review is required",
                                })}
                            />
                            <input
                                placeholder="Write your reviews"
                                className="reviews__input"
                                type="text"
                                {...register("review", {
                                    required: "Review is required",
                                })}
                            />

                            <Controller
                                name="rating"
                                control={control}
                                rules={{required: "Rating is required"}}
                                render={({field, fieldState}) => (
                                    <ReviewsRating
                                        value={field.value}
                                        onChange={field.onChange}
                                        name={field.name}
                                        errorText={fieldState.error?.message}
                                    />
                                )}
                            />

                            <button type="submit" className="reviews__btn">
                                <span>Submit a review</span>
                            </button>
                        </form>
                    ) : (
                        <div className="reviews__input-success-message">
                            Thank you! We are reviewing your feedback and will publish it soon.🖤
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}