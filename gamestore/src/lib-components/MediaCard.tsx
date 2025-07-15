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
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Rating
                        name="text-feedback"
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                    /> <Typography variant="h5" component="div">
                    {price}
                </Typography>
                </CardContent>
            </Card>
        </>

    );
}