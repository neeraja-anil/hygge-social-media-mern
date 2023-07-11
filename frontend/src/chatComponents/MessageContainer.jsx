

import { Box, useTheme, useMediaQuery } from '@mui/material'
import { styled } from '@mui/system'


const MessageContainer = styled(Box)(({ theme }, isMobileScreens = useMediaQuery('(max-width:768px)')) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    borderRadius: '0.75rem',
    maxHeight: '55vh',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: '0.2rem',
        '&-thumb': {
            backgroundColor: theme.palette.primary.dark,
            width: '0.1rem'
        }
    }
}))


export default MessageContainer