"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

type BasicRatingProps = {
    value: number | null;
    onChange: (val: number | null) => void;
    name?: string;
    errorText?: string;
};

export default function BasicRating({ value, onChange, name = "rating", errorText }: BasicRatingProps) {
    return (
        <Box sx={{ "& > legend": { mt: 2 } }}>
            <Rating
                name={name}
                value={value ?? 0}
                onChange={(_, newValue) => onChange(newValue)}
                max={5}
                precision={1}
            />
            {errorText ? <p style={{ color: "red", marginTop: 8 }}>{errorText}</p> : null}
        </Box>
    );
}
