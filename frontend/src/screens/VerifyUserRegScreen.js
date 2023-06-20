import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useVerifyRegistrationMutation } from '../redux/usersApiSlice'
import { clearPhone } from '../redux/authSlice'
import { toast } from 'react-toastify'


const VerifyUserRegScreen = () => {
    const [otp, setOtp] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [verifyRegistration, { isLoading }] = useVerifyRegistrationMutation()
    const { phone } = useSelector(state => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        //disatching verifyRegistration
        try {
            const res = await verifyRegistration({ phone, otp }).unwrap()
            toast.success(res.message)
            navigate('/')
            dispatch(clearPhone())
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="OTP"
                                name="otp"
                                type='otp'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        SIGN UP
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default VerifyUserRegScreen