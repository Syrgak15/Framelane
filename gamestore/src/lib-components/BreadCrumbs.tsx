import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {headerPageConfig} from "../config/pages.config";



export default function BasicBreadcrumbs({title} : {title: string}) {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" sx={{marginTop: 15}} >
                <Link
                    sx={{cursor: 'pointer'}}
                    underline="hover"
                    color="inherit"
                    href="/">
                    Home
                </Link>
                <Link
                    sx={{cursor: 'pointer'}}
                    underline="hover"
                    color="inherit"
                    href={`/${headerPageConfig.COLLECTIONS}`}
                >
                    Glasses
                </Link>
                <Typography
                    sx={{ color: 'text.primary'}}
                >{title}
                </Typography>
            </Breadcrumbs>
        </div>
    );
}