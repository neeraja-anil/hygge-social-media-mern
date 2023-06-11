import React, { useState } from 'react'
import { Box, Typography, useMediaQuery, FormControl, useTheme, InputBase, IconButton, Select, MenuItem, Icon } from '@mui/material'
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

    const fullName = 'fakeman'
    //  const fullName = `${user.firstName} ${user.lastName}`


    return (
        <FlexBetween padding='1rem 6%' backgroundColor={alt} >
            <FlexBetween gap='1.75rem'>
                <Typography
                    fontWeight='bold'
                    fontSize='clamp(1rem, 2rem, 2.25rem)'
                    color='primary'
                    onClick={() => navigate('/home')}
                    sx={{
                        fontFamily: 'Yesteryear',
                        "&:hover": {
                            color: primaryLight,
                            cursor: 'pointer'
                        }
                    }}
                >
                    hygge
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween gap='3rem' backgroundColor={neutralLight} borderRadius='9px' padding='0.1rem 1.5rem'>
                        <InputBase placeholder='Search...' />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
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
                    <FormControl variant='standard' value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: '150px',
                                borderRadius: '0.25rem',
                                p: '0.25rem 1rem',
                                '& .MuiSvgIcon-root': {
                                    pr: '0.25rem',
                                    width: '3rem'
                                },
                                '& .MuiSelect-select:focus': {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem >Logout</MenuItem>
                        </Select>
                    </FormControl>

                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE VIEW */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position='fixed'
                    right='0'
                    bottom='0'
                    height='100%'
                    zIndex='10'
                    minWidth='300px'
                    maxWidth='500px'
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display='flex' justifyContent='flex-end' p='1rem'>
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
            )}

        </FlexBetween >
    )
}

export default Navbar