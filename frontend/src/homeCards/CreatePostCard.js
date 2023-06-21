import React, { useState } from 'react'
import axios from 'axios'
import { Box, useTheme, Avatar, Typography, Divider, useMediaQuery, InputBase, IconButton, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import CardWrapper from '../components/CardWrapper'
import FlexBetween from '../components/FlexBetween'
import { ImageOutlined, MicNoneOutlined, MovieOutlined, EditOutlined } from '@mui/icons-material'


const CreatePostCard = () => {
    const [post, setPost] = useState('')
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState({})

    const { user } = useSelector((state) => state.auth)

    const { picturePath, token } = user

    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light
    const medium = theme.palette.neutral.medium

    if (!user) {
        return null
    }
    //PROFILE PIC UPLOAD
    const handleUploadPost = async (acceptedFiles) => {
        //const file = acceptedFiles[0]
        const formData = new FormData()
        formData.append('description', post)
        if (image) {
            formData.append('post', image)
            formData.append('postPath', image.name)
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.post("http://localhost:5001/api/posts", formData, config)
            const posts = data
            console.log('post', posts)
            setPost("")
            setImage({})
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <CardWrapper>
            <FlexBetween gap='1rem' pb='0.5rem'>
                <Avatar src={picturePath} />
                <InputBase
                    placeholder='New Post'
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    sx={{
                        width: '100%',
                        borderRadius: '20px',
                        padding: '0.5rem 1.5rem',
                        backgroundColor: neutralLight,
                    }}
                />
            </FlexBetween>
            {isImage ? (
                <Dropzone
                    acceptedFiles='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                >
                    {({ getRootProps, getInputProps }) => (
                        <Box
                            {...getRootProps()}
                            border={'2px dashed'}
                            p='1rem'
                            sx={{ '&.hover': { cursor: 'pointer' } }}
                        >
                            <input {...getInputProps()} />
                            {!image.name ? (
                                <p>Add Image Here</p>
                            ) : (
                                <FlexBetween>
                                    <Typography>{image.name}</Typography>
                                    <EditOutlined />
                                </FlexBetween>
                            )}
                        </Box>
                    )}
                </Dropzone>
            ) : null}

            <Divider />
            <FlexBetween gap='1rem' pt='0.5rem'>
                <FlexBetween gap='.1rem'>
                    <IconButton onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined sx={{ color: medium }} />
                    </IconButton>
                    <Typography color={medium}>Image</Typography>
                </FlexBetween>
                <FlexBetween gap='0.1rem'>
                    <IconButton>
                        <MovieOutlined sx={{ color: medium }} />
                    </IconButton>
                    <Typography color={medium}>clip</Typography>
                </FlexBetween>
                <FlexBetween gap='0.1rem'>
                    <IconButton>
                        <MicNoneOutlined sx={{ color: medium }} />
                    </IconButton>
                    <Typography color={medium}>Audio</Typography>
                </FlexBetween>
                <FlexBetween gap='0.1rem'>
                    <Button
                        onClick={handleUploadPost}
                        sx={{
                            color: '#ffffff',
                            backgroundColor: theme.palette.primary.main,
                        }}
                    >
                        post
                    </Button>
                </FlexBetween>

            </FlexBetween>
        </CardWrapper>
    )
}

export default CreatePostCard