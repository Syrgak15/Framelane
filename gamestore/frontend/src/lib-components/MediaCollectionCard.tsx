
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


type MediaCardCollectionProps = {
    image: string;
    title: string;
    price: number | string;
};

export default function MediaCollectionCard({image, title, price}: MediaCardCollectionProps) {

    return (
        <>
            <Card
                sx={{
                    width: "100%",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        scale: "1.01",
                    },
                    borderRadius: "0px",
                    boxShadow: "unset",
                }}
            >
                <CardMedia
                    sx={{
                        height: 500,
                        "@media (max-width:600px)": {
                            height: 250, // на мобилках в 2 раза меньше
                        },
                    }}
                    image={image}
                />
                <CardContent
                    sx={{
                        paddingLeft: 0,
                        "@media (max-width:600px)": {
                            marginLeft: "10px", // поменьше отступ
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "800",
                            fontSize: 17,
                            textTransform: "uppercase",
                            "@media (max-width:600px)": {
                                fontSize: 14, // меньше шрифт
                            },
                        }}
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 17,
                            fontWeight: 300,
                            "@media (max-width:600px)": {
                                fontSize: 14,
                            },
                        }}
                        variant="h5"
                        component="div"
                    >
                        {price}
                    </Typography>
                </CardContent>
            </Card>

        </>

    );
}