import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type ContactUsProps = {
    deliveryInfo: any;
    title?: string;
};

export default function AccordionExpandIcon({
                                                deliveryInfo,
                                                title,
                                            }: ContactUsProps) {
    const deliveryDetails = deliveryInfo.delivery;
    const deliveryShipping = deliveryInfo.delivery.shipping_options;

    return (
        <Accordion
            sx={{
                maxWidth: '67%',
                borderBottom: '1px solid #000',
                boxShadow: 'unset',
                mb: 2,
                '&:before': { display: 'none' },
            }}
        >
            <AccordionSummary
                expandIcon={<ArrowDropDownIcon sx={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                sx={{
                    '& .MuiTypography-root': {
                        fontWeight: 600,
                        fontSize: '1rem',
                    },
                }}
            >
                <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: 'text.primary', fontFamily: 'Comfortaa',
                }}>
                    {title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails
                sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}
            >
                <Typography sx={{ fontWeight: 600, fontFamily: 'Comfortaa', fontSize: '.9rem', mb: 0.5 }}>
                    Shipping options :
                </Typography>

                {deliveryShipping.map((item: string, id: number) => (
                    <Typography
                        key={id}
                        sx={{ color: 'text.secondary', fontFamily: 'Comfortaa', pl: 1, lineHeight: 1.6 }}
                    >
                        • {item}
                    </Typography>
                ))}

                <Typography sx={{ mt: 1, fontSize: '.9rem', fontFamily: 'Comfortaa' }}>
                    <b>Cost:</b> {deliveryDetails.cost}
                </Typography>
                <Typography sx={{ fontSize: '.9rem', fontFamily: 'Comfortaa' }}>
                    <b>International:</b> {deliveryDetails.international}
                </Typography>
                <Typography sx={{ fontSize: '.9rem', fontFamily: 'Comfortaa' }}>
                    <b>Returns:</b> {deliveryDetails.returns}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}
