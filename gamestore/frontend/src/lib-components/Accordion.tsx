import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useState} from "react";

export default function AccordionExpandIcon({title}: { title: string }) {

    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion
            expanded={false}
            sx={{
                width: '200px',
                boxShadow: 'unset',
                margin: 0,
                padding: 0,
            }}
        >
            <AccordionSummary
                sx={{ width: '50px' }}
                expandIcon={
                    <ArrowDropDownIcon
                        sx={{
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s',
                        }}
                    />
                }
                onClick={() => setExpanded(!expanded)}
            >
                <Typography component="span">{title}</Typography>
            </AccordionSummary>
        </Accordion>
    );
}