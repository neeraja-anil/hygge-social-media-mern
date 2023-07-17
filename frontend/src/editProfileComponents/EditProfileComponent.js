import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Container, CssBaseline, Avatar, Typography, TextField, Button, Grid, } from '@mui/material'
import { EditOutlined, LockOutlined } from '@mui/icons-material'
import Dropzone from 'react-dropzone'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FlexBetween from '../components/FlexBetween'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEditUserMutation } from '../redux/usersApiSlice'


const EditProfileComponent = () => {
    const { user } = useSelector((state) => state.auth)

    const [avatar, setAvatar] = useState({})
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')
    const [desc, setDesc] = useState(user?.desc || '')
    const [location, setLocation] = useState(user?.location || '')
    const [occupation, setOccupation] = useState(user?.occupation || '')

    const navigate = useNavigate()
    const userId = user._id
    const [editUser, { isLoading }] = useEditUserMutation()


    //FORM SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('avatar', avatar)
        formData.append('desc', desc)
        formData.append('location', location)
        formData.append('occupation', occupation)
        try {
            const res = await editUser(formData).unwrap()
            console.log(res)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

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
                <Avatar src='' sx={{ m: 1, bgcolor: 'secondary.main' }} />
                <Typography component="h1" variant="h5">
                    Edit Profile
                </Typography>
                <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
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
                                        p='0.5rem'
                                        sx={{ '&.hover': { cursor: 'pointer' } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!avatar.name ? (
                                            <Box display='flex'>
                                                <Avatar src={user?.picturePath} />
                                                <Box pl='0.5rem'>
                                                    <p>change Profile Picture</p>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{avatar.name}</Typography>
                                                <EditOutlined onClick={() => setAvatar('')} />
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
                                label=" add a Bio"
                                name="bio"
                                type='bio'
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Location"
                                name="location"
                                type='location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="occupation"
                                label="occupation"
                                type='occupation'
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Edit
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default EditProfileComponent