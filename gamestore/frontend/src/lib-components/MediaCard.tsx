import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';


type MediaCardProps = {
    image: string;
    key: number;
    title: string;
    price?: number | string;
};

export default function MediaCard({image, title, price}: MediaCardProps) {

    return (
        <>
            <Card
                sx={{
                    width: 435 ,
                    cursor: 'pointer',
                    boxShadow: 'unset',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        scale: '1.01'
                    }
                }}>
                <CardMedia
                    sx={{height: 500}}
                    image={image}
                />
                <CardContent
                    sx={{paddingLeft: 0}}
                >
                    <Typography
                        sx={{
                            fontWeight: '800',
                            fontSize: 17,
                            textTransform: 'uppercase',
                        }}
                        gutterBottom
                        variant="h5"
                        component="div">
                        {title}
                    </Typography>
                    <Typography
                        sx={{fontSize: 17, fontWeight: 300}}
                        variant="h5"
                        component="div">
                    {price}
                    </Typography>
                </CardContent>
            </Card>

        </>

    );
}