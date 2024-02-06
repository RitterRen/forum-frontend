import React from 'react';
import { Button, Textarea, Stack, Group } from '@mantine/core';
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";


interface ReplyFormProps {
    onSubmit: (message: string) => void; // Handle reply submission
}

export const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        onSubmit(message);
        setMessage(''); // Reset message input after submission
    };

    return (
        <div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px', // Use theme spacing instead of hard-coded values for better theming
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Typography variant="body2">Add new reply</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            label="Your Answer..."
                            multiline
                            rows={1}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            type="submit"
                            variant="outlined"
                        >
                            Reply
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
        // <Group dir={'row'}>
        //     <Textarea
        //         placeholder="Write your reply..."
        //         resize="vertical"
        //         mt="sm"
        //         value={message}
        //         onChange={(event) => setMessage(event.currentTarget.value)}
        //         maxRows={2}
        //     />
        //     <Button onClick={handleSubmit}>Reply</Button>
        // </Group>
    );
};