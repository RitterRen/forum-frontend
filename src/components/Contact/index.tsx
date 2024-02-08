import { Textarea } from '@mui/joy'
import { Box, Button, Container, TextField, Dialog, DialogActions, DialogContent, DialogTitle, TextareaAutosize } from '@mui/material'
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { ContactModel } from '../../types'

const token = localStorage.getItem("token")

const Contact = () => {

    const [form, setForm] = useState<ContactModel>({
        Subject: '',
        email: '',
        message: ''
    })

    const [open, setOpen] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handlerSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            // Example POST request to your backend
            const response = await fetch('http://localhost:8888/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Assuming a Bearer token
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error('Something went wrong');

            const data = await response.json();
            console.log(data); // Process the response data as needed

            setOpen(!open); // Show the popup on successful submission
        } catch (error) {
            console.error('Submission error:', error);
        }

    }

    const handleClose = () => {
        setOpen(false); // Close the popup
    };



    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <h1>Contact Admin</h1>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    autoFocus
                />
                <TextareaAutosize

                    id="message"
                    style={{ width: '100%', marginTop: '16px' }}
                    minRows={6}
                    maxRows={10}
                    placeholder="Write something here ..."
                    name="message"
                    value={form.message}
                    onChange={handleChange}

                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained" sx={{ mt: 3, mb: 2 }}
                    onClick={handlerSubmit}
                >
                    Send
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Submission Successful</DialogTitle>
                <DialogContent>Your message has been successfully sent to the admin.</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default Contact