import { Box, LinearProgress, Stack, Typography } from "@mui/material";

type Review = { rating: number };

type RatingDistributionProps = {
    reviews: Review[];
};

export default function RatingProgressBar({ reviews }: RatingDistributionProps) {
    const total = reviews.length;

    const counts = [5, 4, 3, 2, 1].map(
        (star) => reviews.filter((r) => r.rating === star).length
    );

    return (
        <Stack spacing={1} sx={{ width: 250 }}>
            {counts.map((count, idx) => {
                const star = 5 - idx;
                const percent = total > 0 ? (count / total) * 100 : 0;

                return (
                    <Stack key={star} direction="row" alignItems="center" spacing={1}>
                        <Typography width={20}>{star}★</Typography>
                        <Box flex={1}>
                            <LinearProgress
                                variant="determinate"
                                value={percent}
                                sx={{
                                    height: 12,
                                    borderRadius: 5,
                                    backgroundColor: "#eee",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: "#000",
                                    },
                                }}
                            />
                        </Box>
                        <Typography width={30} textAlign="right">
                            {count}
                        </Typography>
                    </Stack>
                );
            })}
        </Stack>
    );
}
