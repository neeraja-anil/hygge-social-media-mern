import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeScreen = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <Box>
            <Navbar />
            Homescreen
        </Box>
    )
}

export default HomeScreen