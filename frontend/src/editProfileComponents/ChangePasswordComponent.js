import React, { useEffect, useState } from 'react'
import { Box, Container, CssBaseline, Avatar, Typography, TextField, Button, Grid, } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import FlexBetween from '../components/FlexBetween'
import { LockOutlined } from '@mui/icons-material'
import { useChangePasswordMutation, useEditUserMutation } from '../redux/usersApiSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const ChangePasswordComponent = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { user } = useSelector((state) => state.auth)
    const userId = user._id
    const navigate = useNavigate()
    const [changePassword, { isLoading }] = useChangePasswordMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            try {
                const res = await changePassword({ phone, password })
                if (res.data.status === 'success') {
                    toast.success(res.data.msg)
                    setPhone('')
                    setPassword('')
                    setConfirmPassword('')
                }
                console.log(res.data.status)
                toast.success('Password updated successfully')
                navigate(`/profile/${userId}`)
            } catch (err) {
                toast.error(err)
            }
        } else {
            toast.error('password and confirm password should be same')
        }

    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    //marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="phone"
                                required
                                fullWidth
                                label="phone"
                                type='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="new password"
                                name="password"
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="confirm new password"
                                name="password"
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Change
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default ChangePasswordComponent