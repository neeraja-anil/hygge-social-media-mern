import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, CircularProgress } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../redux/usersApiSlice'
import { setLogin } from '../redux/authSlice'
import { toast } from 'react-toastify'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { search } = useLocation();
    const redirect = search ? new URLSearchParams(search).get('redirect') : '/home'

    const [login, { isLoading }] = useLoginMutation()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            navigate(redirect)
        }
    }, [user, navigate])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        //disatching login
        try {
            const res = await login({ email, password }).unwrap()
            console.log('res', res)
            dispatch(setLogin({ ...res }))
            navigate('/home')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        //<ThemeProvider >
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    {isLoading && <CircularProgress />}
                    <Grid container>
                        <Grid item xs>
                            <Link to="#" style={{ textDecoration: 'none' }}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        //</ThemeProvider>
    )
}

export default LoginScreen