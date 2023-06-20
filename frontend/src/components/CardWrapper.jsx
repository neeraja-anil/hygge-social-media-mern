import { Box, useTheme } from '@mui/material'
import { styled } from '@mui/system'


const CardWrapper = styled(Box)(({ theme }) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: '0.75rem'
}))

export default CardWrapper