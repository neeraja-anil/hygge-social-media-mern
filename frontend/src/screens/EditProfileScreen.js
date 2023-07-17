import React, { useState } from 'react'
import CardWrapper from '../components/CardWrapper'
import Navbar from '../components/Navbar'
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import EditProfileComponent from '../editProfileComponents/EditProfileComponent'
import ChangePasswordComponent from '../editProfileComponents/ChangePasswordComponent'

const EditProfileScreen = () => {
    const [showProfileEdit, setShowProfileEdit] = useState(true)
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    const theme = useTheme()

    return (
        <Box>
            <Navbar />
            <CardWrapper sx={{ padding: '0.1rem' }}>
                <Box
                    display={isNonMobileScreens ? 'flex' : 'block'}
                    //justifyContent='space-between'
                    width='100%'
                    gap='1rem'
                    padding='1rem 5%'
                >
                    <CardWrapper flexBasis={isNonMobileScreens ? '25%' : ''}>
                        <Box display={!isNonMobileScreens ? 'flex' : 'block'}
                            justifyContent='center'
                            width='100%'
                            gap='1rem'>
                            <Box pb='0.5rem'>
                                <Box
                                    gap='1rem'
                                    padding='1rem 0.5rem'
                                    borderRadius='0.75rem'
                                    //backgroundColor={theme.palette.primary.light}
                                    onClick={() => setShowProfileEdit(true)}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: theme.palette.primary.light,
                                            cursor: 'pointer'
                                        }
                                    }}
                                >
                                    <Typography>
                                        Edit Profile
                                    </Typography>
                                    <Divider />
                                </Box>
                            </Box>
                            <Box
                                gap='1rem'
                                padding='1rem 0.5rem'
                                borderRadius='0.75rem'
                                //backgroundColor={theme.palette.primary.light}
                                onClick={() => setShowProfileEdit(false)}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary.light,
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                <Typography>
                                    Change Password
                                </Typography>
                                <Divider />

                            </Box>
                        </Box>

                    </CardWrapper>
                    <CardWrapper flexBasis={isNonMobileScreens ? '75%' : ''}>
                        <Box gap='1rem' padding='1rem 0'>
                            {showProfileEdit ? <EditProfileComponent /> : <ChangePasswordComponent />}
                        </Box>
                    </CardWrapper>
                </Box>
            </CardWrapper >
        </Box >
    )
}

export default EditProfileScreen