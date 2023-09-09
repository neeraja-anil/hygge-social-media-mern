import React, { useState } from 'react'
import CardWrapper from '../components/CardWrapper'
import { useUnseenNotificationsQuery, useSeenNotificationsQuery, useMarkAsReadMutation } from '../redux/usersApiSlice'
import { Avatar, Box, CircularProgress, IconButton, Typography, useTheme, Tab } from '@mui/material'
import { TabContext, TabPanel, TabList } from '@mui/lab'
import { useSelector } from 'react-redux'
import FlexBetween from '../components/FlexBetween'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const NotificationMenu = () => {
    const [value, setValue] = useState('unseen')
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { user } = useSelector(state => state.auth)
    const { data: unseen, isLoading, isError } = useUnseenNotificationsQuery(user?._id || '')
    const { data: seen, isLoadingSeen, isErrorSeen } = useSeenNotificationsQuery(user?._id || '')
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <CardWrapper>
                    <Typography variant='h4'>Notifications</Typography>
                    <Typography sx={{ color: theme.palette.neutral.medium }}>Cannot load Notifications.try again</Typography>
                </CardWrapper>
            ) : (
                <div style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
                >
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{
                                borderBottom: 1,
                                borderColor: "divider"
                            }}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab label="New" value='unseen' />
                                    <Tab label="Seen Notifications" value='seen' />
                                </TabList>
                            </Box>
                            <TabPanel value='unseen'>
                                {
                                    unseen?.unseenNotifications.map(unseen => (
                                        <Box pt='1.1rem' key={unseen._id}>
                                            <FlexBetween gap='1rem' pb='0.1rem'>
                                                <FlexBetween gap='1rem' onClick={() => navigate(`${unseen.postPath}`)} sx={{ '&:hover': { cursor: 'pointer' } }}>
                                                    <Avatar />
                                                    <Box>
                                                        <Typography>{unseen.message}</Typography>
                                                    </Box>
                                                </FlexBetween>
                                            </FlexBetween>
                                        </Box>

                                    ))
                                }
                            </TabPanel>
                            <TabPanel value='seen'>
                                {
                                    seen?.seenNotifications.map(seen => (
                                        <Box pt='1.1rem' key={seen._id}>
                                            <FlexBetween gap='1rem' pb='0.1rem'>
                                                <FlexBetween gap='1rem' onClick={() => navigate(`${seen.postPath}`)} sx={{ '&:hover': { cursor: 'pointer' } }}>
                                                    <Avatar />
                                                    <Box>
                                                        <Typography>{seen.message}</Typography>
                                                    </Box>
                                                </FlexBetween>
                                            </FlexBetween>
                                        </Box>

                                    ))
                                }
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            )}

        </>
    )
}

export default NotificationMenu