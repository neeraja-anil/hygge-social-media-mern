import React from 'react'
import { Box, useTheme, Avatar, Typography, Divider, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { LocationOnOutlined, ManageAccountsOutlined, PersonAddAlt, WorkOutlineOutlined } from '@mui/icons-material'

const ProfileCard = () => {

    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light
    const neutralDark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.alt
    const medium = theme.palette.neutral.medium
    const isMobileScreens = useMediaQuery('(max-width:900px)')

    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    if (!user) {
        return null
    }
    const { _id, firstName, lastName, picturePath, friends, location, occupation, viewedProfiles, impressions } = user
    return (
        <CardWrapper >
            <FlexBetween
                gap='1rem'
                pb='1.1rem'
                onClick={() => navigate(`/profile/${_id}`)}
            >
                <FlexBetween gap='1rem'>
                    <Avatar src={picturePath} />
                    <Box>
                        <Typography
                            variant='h4'
                            fontWeight='500'
                            color='dark'
                            sx={{
                                "&:hover": {
                                    color: primaryLight,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: 'pointer'
                    }
                }} />
            </FlexBetween>
            <Divider />
            <FlexBetween
                gap='1rem'
                pb='1.1rem'
                pt='1.1rem'
            >
                <Box>
                    <FlexBetween gap='1rem'>
                        <LocationOnOutlined />
                        <Typography
                            variant='h6'
                            fontWeight='400'
                            color={medium}
                        >
                            {location ? location : 'location'}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween gap='1rem'>
                        <WorkOutlineOutlined />
                        <Typography
                            variant='h6'
                            fontWeight='400'
                            color={medium}
                        >
                            {occupation ? occupation : 'fake job'}
                        </Typography>
                    </FlexBetween>
                </Box>
            </FlexBetween>
            <Divider />
            <FlexBetween
                gap='1rem'
                pb='1.1rem'
                pt='1.1rem'
            >
                <Box>
                    <FlexBetween gap='1rem'>
                        <Typography
                            variant='h6'
                            fontWeight='400'
                            color={medium}
                        >
                            Profile Views
                        </Typography>
                        <Typography>
                            {viewedProfiles ? viewedProfiles : '0'}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween gap='1rem'>
                        <Typography
                            variant='h6'
                            fontWeight='400'
                            color={medium}
                        >
                            Impressions of your posts
                        </Typography>
                        <Typography>
                            {impressions ? impressions : '0'}
                        </Typography>
                    </FlexBetween>
                </Box>
            </FlexBetween>
            <Divider />
        </CardWrapper>

    )
}

export default ProfileCard