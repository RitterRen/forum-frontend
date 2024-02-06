import { Textarea, Button } from '@mui/joy'
import { Container, Box, TextField, Typography, IconButton } from '@mui/material'
import React from 'react'
import PostFooter from './PostFooter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { inlineWrapper } from '../../styles';

const NewPost = () => {
  return (
    <Container component="main" maxWidth="sm">
        <Box sx={{ mt: 8}}>
            <Box sx={inlineWrapper}>
                <IconButton component={Link} to="/home">
                    <ArrowBackIcon/>
                </IconButton>
                <Typography component="h1" variant="h5">
                    Back
                </Typography>
            </Box> 
            
            
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoFocus
            />
            <Textarea 
                sx={{ mt:2 }}
                minRows={6}
                maxRows={10}
                placeholder="Write something here ..."
            />
            <PostFooter />
        </Box>
    </Container>
  )
}

export default NewPost