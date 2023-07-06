import React from 'react'
import { Box, useTheme, useMediaQuery, Typography } from '@mui/material'
import CardWrapper from '.././components/CardWrapper'
import FlexBetween from '.././components/FlexBetween'
import ads from '.././components/ads.jpg'




const AdsCard = () => {
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    return (
        <CardWrapper >
            <Box>
                <FlexBetween>
                    <Typography> Sponsored </Typography>
                    <Typography sx={{ color: theme.palette.neutral.medium }}> ad</Typography>
                </FlexBetween>
                <Box
                    component="img"
                    alt="cannot load image.retry"
                    src={ads}
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.5rem'
                    }}
                />
                <Typography sx={{ color: theme.palette.neutral.main, fontWeight: 500 }}>Need Design Work?</Typography>
                <Typography sx={{ color: theme.palette.neutral.mediumMain, fontSize: 12 }}>Hire the worlds best designers here</Typography>

            </Box>
        </CardWrapper>
    )
}

export default AdsCard