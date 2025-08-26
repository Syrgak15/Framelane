import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type ContactUsProps = {
    productInfo: any;
    title?: string;
};

export default function AccordionExpandIcon({
                                                productInfo,
                                                title,
                                            }: ContactUsProps) {
    const productDetails = productInfo.product;
    const productDescription = productInfo.product.description;
    const productFeatures = productInfo.product.features;

    return (
        <Accordion
            sx={{
                maxWidth: '67%',
                boxShadow: 'unset',
                borderBottom: '1px solid #000',
                mb: 2,
                '&:before': { display: 'none' },
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ArrowDropDownIcon sx={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                }
                sx={{
                    '& .MuiTypography-root': {
                        fontWeight: 600,
                        fontSize: '1rem',
                    },
                }}
            >
                <Typography sx={{ fontWeight: 600, fontSize: '2rem', color: 'text.primary', fontFamily: 'Comfortaa' }}>
                    {title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails
                sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}
            >
                <Typography sx={{ color: 'text.primary', mb: 1, fontFamily: 'Comfortaa' }}>
                    {productDescription}
                </Typography>
                <Typography
                    sx={{ fontWeight: 600, fontSize: '.9rem', mb: 0.5, fontFamily: 'Comfortaa' }}
                >
                    Main Features :
                </Typography>
                {productFeatures.map((feature: string, id: number) => (
                    <Typography
                        key={id}
                        sx={{ color: 'text.secondary', pl: 1, lineHeight: 1.6, fontFamily: 'Comfortaa' }}
                    >
                        • {feature}
                    </Typography>
                ))}

                {productDetails.size && (
                    <Typography sx={{ mt: 1, fontWeight: 500, fontFamily: 'Comfortaa' }}>
                        Size: {productDetails.size}
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
}
