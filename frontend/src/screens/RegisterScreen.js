import React from 'react'
import axios from 'axios'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, } from '@mui/material'
import { EditOutlined, LockOutlined } from '@mui/icons-material'
import Dropzone from 'react-dropzone'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FlexBetween from '../components/FlexBetween'
import { useRegistrationMutation } from '../redux/usersApiSlice'
import { setOtpRegister } from '../redux/authSlice'
import { toast } from 'react-toastify'


const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [picturePath, setPicturePath] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [registration, { isLoading }] = useRegistrationMutation()

    //PROFILE PIC UPLOAD
    const handleUpload = async (acceptedFiles) => {
        const file = acceptedFiles[0]
        const formData = new FormData()
        formData.append('picturePath', file)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post("http://localhost:5001/api/upload", formData, config)
            setPicturePath(data)
        } catch (error) {
            console.log(error)
        }
    }

    //FORM SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault()
        //disatching registration
        try {
            const res = await registration({ firstName, lastName, picturePath, phone, email, password }).unwrap()
            toast.success(res.msg)
            dispatch(setOtpRegister(res.phone))
            navigate('/verify')
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
                                onDrop={(acceptedFiles) => handleUpload(acceptedFiles)}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={'2px dashed'}
                                        p='1rem'
                                        sx={{ '&.hover': { cursor: 'pointer' } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!picturePath ? (
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{picturePath}</Typography>
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