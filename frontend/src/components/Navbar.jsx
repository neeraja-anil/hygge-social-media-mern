import React, { useState } from 'react'
import { Box, Typography, useMediaQuery, FormControl, useTheme, InputBase, IconButton } from '@mui/material'
import { Search, DarkMode, Light, Message, Notifications, Help, Menu, Close, LightMode } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setMode } from '../redux/modeSlice'
import FlexBetween from './FlexBetween'

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light
    const neutralDark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.alt

    //  const fullName = `${user.firstName} ${user.lastName}`


    return (
        <FlexBetween padding='1rem 6%' backgroundColor={alt}>
            <FlexBetween gap='1.75rem'>
                <Typography
                    sx={{ fontFamily: 'Yesteryear' }}
                    fontWeight='bold'
                    fontSize='clamp(1rem, 2rem, 2.25rem)'
                    color='primary'
                    onClick={() => navigate('/home')}
                >
                    hygge
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween>
                        <InputBase placeholder='Search...' />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
                {/* DESKTOP NAV */}
                {isNonMobileScreens ? (
                    <FlexBetween gap='2rem'>
                        <IconButton onClick={() => dispatch(setMode())} >
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightMode sx={{ color: 'dark', fontSize: '25px' }} />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: '25px' }} />
                        <Notifications sx={{ fontSize: '25px' }} />
                        <Help sx={{ fontSize: '25px' }} />

                    </FlexBetween>
                ) : (
                    <IconButton></IconButton>
                )}
            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar