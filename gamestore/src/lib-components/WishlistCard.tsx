import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type MediaCardProps = {
    image: string;
    key: number;
    title: string;
    price?: number | string;
};

export default function MediaCard({ image, title, price }: MediaCardProps) {
    return (
        <Card
            sx={{
                borderRadius: 3,
                maxWidth: 250,
                maxHeight: 350,
                cursor: 'pointer',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                backgroundColor: '#fff',
            }}
        >
            <CardMedia
                sx={{
                    height: 210,
                    width: '100%',
                    objectFit: 'cover',
                    borderBottom: '1px solid #eee',
                }}
                image={image}
            />
            <CardContent
                sx={{
                    px: 2,
                    py: 2,
                    textAlign: 'left',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 800,
                        fontSize: 15,
                        textTransform: 'uppercase',
                        lineHeight: 1.4,
                        color: '#111',
                        letterSpacing: 0.5,
                    }}
                    variant="h6"
                    component="div"
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: '#000',
                        mt: 1,
                    }}
                    variant="body1"
                    component="div"
                >
                    {price}
                </Typography>
            </CardContent>
        </Card>
    );
}
