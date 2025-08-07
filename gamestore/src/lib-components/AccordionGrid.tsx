import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


type ContactUsProps = {
    question: string,
    answer: string,
}

export default function AccordionExpandIcon({question, answer} : ContactUsProps) {
    return (
        <div>
            <Accordion
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    marginBottom: 4,
                    fontFamily: "'Comfortaa', cursive, sans-serif",
                }}
            >
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon sx={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                        padding: 2,
                        '& .MuiTypography-root': {
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: '#222',
                            fontFamily: "'Comfortaa', cursive, sans-serif",
                        },
                    }}
                >
                    <Typography component="span">{question}</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        paddingX: 2,
                        paddingBottom: 3,
                        paddingTop: 0,
                        '& .MuiTypography-root': {
                            fontSize: '0.95rem',
                            color: '#555',
                            lineHeight: 1.5,
                            fontFamily: "'Comfortaa', cursive, sans-serif",
                            marginBottom: 1,
                        },
                    }}
                >
                    <Typography>{answer}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}