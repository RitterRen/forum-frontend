import { Textarea } from '@mui/joy'
import { Box, Container, TextField } from '@mui/material'
import React from 'react'

const Contact = () => {
    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ mt: 8}}>
                <h1>Contact Admin</h1>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                />
                <Textarea 
                    sx={{ mt:2 }}
                    minRows={6}
                    maxRows={10}
                    placeholder="Write something here ..."
                />
            </Box>
        </Container>
    )
}

export default Contact