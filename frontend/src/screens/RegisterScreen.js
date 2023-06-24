import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Container, CssBaseline, Avatar, Typography, TextField, Button, Grid, } from '@mui/material'
import { EditOutlined, LockOutlined } from '@mui/icons-material'
import Dropzone from 'react-dropzone'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FlexBetween from '../components/FlexBetween'
import { useRegistrationMutation } from '../redux/usersApiSlice'
import { toast } from 'react-toastify'


const RegisterScreen = () => {
    const [avatar, setAvatar] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const [registration, { isLoading }] = useRegistrationMutation()

    //FORM SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await registration({ firstName, lastName, phone, email, password }).unwrap()
            console.log(res)
            toast.success(res.msg)
            navigate('/verify', { state: { data: { firstName, lastName, phone, email, password, avatar } } })
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                label="First Name"
                                type='firstName'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                type='lastName'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Dropzone
                                acceptedFiles='.jpg,.jpeg,.png'
                                multiple={false}
                                onDrop={(acceptedFiles) => setAvatar(acceptedFiles[0])}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={'2px dashed'}
                                        p='1rem'
                                        sx={{ '&.hover': { cursor: 'pointer' } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!avatar.name ? (
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{avatar.name}</Typography>
                                                <EditOutlined />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                type='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Generate OTP
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

export default RegisterScreen