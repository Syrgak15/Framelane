"use client"

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Image from 'next/image'
import {contactUsConfig} from "../config/pages.config";

export default function ColumnsGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={20}>
                <Grid size={10}>
                    <div className="contact-us__support">
                        <h3>Help & Support</h3>
                        <p>
                            Have a question or need assistance? We are here for you.
                        </p>
                        <p>
                            Feel free to reach out to Framelane Support — we’re always happy to help!
                        </p>
                    </div>
                    <Button
                        href={contactUsConfig.OWNER} target="_blank"
                        sx={
                            {
                                background: "rgba(201 88 76 / 1.0)",
                                borderRadius: "40px",
                                padding: "10px",
                                width: "180px",
                                marginTop: "35px"
                            }
                        }
                        variant="contained">
                        Contact Support
                    </Button>
                </Grid>
                <Grid size={10}>
                    <Image
                        src="/background/contact-us__banner.svg"
                        alt="Banner"
                        width={700}
                        height={600}
                        style={{ objectFit: 'cover' }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}