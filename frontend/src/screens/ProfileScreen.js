import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CardWrapper from '.././components/CardWrapper'
import FlexBetween from '.././components/FlexBetween'
import { Avatar, Box, Button, Divider, IconButton, Typography, useMediaQuery, useTheme, ImageList, ImageListItem } from '@mui/material'
import Navbar from '../components/Navbar'
import { GridOn } from '@mui/icons-material'
import { useGetUserQuery } from '../redux/usersApiSlice'
import { useUserPostsQuery } from '../redux/postApiSlice'

const ProfileScreen = () => {
    const [isOwnProfile, setIsOwnProfile] = useState(false)
    const isNonMobileScreens = useMediaQuery('(min-width:768px)')
    const theme = useTheme()
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector((state) => state.auth)
    const { data: userInfo, error } = useGetUserQuery(id)
    const { data: posts } = useUserPostsQuery(id)
    console.log(posts)

    useEffect(() => {
        if (!user) {
            navigate('/')

        }
    }, [user, navigate])
    useEffect(() => {
        setIsOwnProfile(user._id === id)
    }, [])

    return (
        <Box>
            <Navbar />
            <Box
                display={isNonMobileScreens ? 'flex' : 'block'}
                justifyContent='space-between'
                width='100%'
                gap='1rem'
                padding='2rem 5%'
            >
                <Box flexBasis={isNonMobileScreens ? '100%' : ''}>
                    <CardWrapper>
                        <FlexBetween p='2rem' gap='1rem' sx={{ display: isNonMobileScreens ? 'flex' : 'block' }}>
                            <FlexBetween gap='1rem'>
                                <Avatar src={userInfo && userInfo.picturePath} sx={{ width: isNonMobileScreens ? 150 : 50, height: isNonMobileScreens ? 150 : 50 }} />
                                <Typography variant='h3' sx={{ fontWeight: 600 }}>{userInfo && userInfo.firstName} {userInfo && userInfo.lastName}</Typography>
                            </FlexBetween>

                            <Box pt='1rem'>
                                <FlexBetween gap='2rem' sx={{ display: isNonMobileScreens ? 'flex' : 'block' }}>
                                    <FlexBetween gap='2rem'>
                                        <Typography></Typography>
                                        <FlexBetween gap='1rem'>
                                            <FlexBetween>
                                                {isOwnProfile ? (
                                                    <Button
                                                        onClick={() => navigate(`/profile/edit/${id}`)}
                                                        sx={{
                                                            color: '#ffffff',
                                                            backgroundColor: theme.palette.primary.main,
                                                            '&:hover': { backgroundColor: theme.palette.primary.dark }
                                                        }}
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        // onClick={}
                                                        sx={{
                                                            color: '#ffffff',
                                                            backgroundColor: theme.palette.primary.main,
                                                            '&:hover': { backgroundColor: theme.palette.primary.dark }
                                                        }}
                                                    >
                                                        Following
                                                    </Button>
                                                )}

                                            </FlexBetween>
                                            <FlexBetween>
                                                <Button
                                                    disabled
                                                    sx={{
                                                        color: '#ffffff',
                                                        // backgroundColor: theme.palette.primary.main,
                                                        '&:hover': { backgroundColor: theme.palette.primary.dark }
                                                    }}
                                                >
                                                    Message
                                                </Button>
                                            </FlexBetween>
                                        </FlexBetween>
                                    </FlexBetween>

                                </FlexBetween>
                                {isNonMobileScreens && (
                                    <FlexBetween gap='1rem' pt='1.1rem'>
                                        <FlexBetween sx={{ color: theme.palette.neutral.mediumMain }}>{userInfo && userInfo.posts.length} Posts</FlexBetween>
                                        <FlexBetween sx={{ color: theme.palette.neutral.mediumMain }}>{userInfo && userInfo.followers.length} Followers</FlexBetween>
                                        <FlexBetween sx={{ color: theme.palette.neutral.mediumMain }}>{userInfo && userInfo.friends.length} Followings</FlexBetween>
                                    </FlexBetween>
                                )}
                                <FlexBetween pt='1.1rem'>
                                    {userInfo?.desc ? <Typography>{userInfo?.desc}</Typography> : ''}
                                </FlexBetween>
                            </Box>
                        </FlexBetween>
                        <Divider />
                        {!isNonMobileScreens && (
                            <>
                                <FlexBetween gap='1rem' pt='1.1rem'>
                                    <FlexBetween sx={{ color: theme.palette.neutral.mediumMain }}>{userInfo && userInfo.posts.length} Posts</FlexBetween>
                                    <FlexBetween sx={{ color: theme.palette.neutral.mediumMain }}>{userInfo && userInfo.followers.length} Followers</FlexBetween>
                                    <FlexBetween sx={{ color: theme.palette.neutral.mediumMain }}>{userInfo && userInfo.friends.length}Followings</FlexBetween>
                                </FlexBetween>
                                <Divider />
                            </>
                        )}
                        <Box display='flex' justifyContent='center' p='1rem' >
                            <FlexBetween gap='1rem'>
                                <GridOn />
                                POST
                            </FlexBetween>
                        </Box>
                        <Divider />
                        <ImageList cols={isNonMobileScreens ? 4 : 3} sx={{ '&:-webkit-scrollbar': { display: 'none' } }}>
                            {posts && posts.map((item) => (
                                <ImageListItem key={item._id}>
                                    <img
                                        src={item.postPath}
                                        alt='image'
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>



                    </CardWrapper>
                </Box >
            </Box >

        </Box >

    )
}

export default ProfileScreen