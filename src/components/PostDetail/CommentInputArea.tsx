import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { inlineWrapper } from '../../styles';

const CommentInputArea = () => {
    const [commentContent, setCommentContent] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentContent(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("hifds")
        e.preventDefault();
        setCommentContent("");
    };


    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={inlineWrapper}>
            <TextField
                margin="normal"
                sx={{width: '85%'}}
                id="email"
                name="comment"
                onChange={handleChange}
                value={commentContent}
                placeholder="What are your thoughts?"
            />
            <Box sx={{ml:1}}>
                <Button
                    fullWidth
                    type="submit"
                    variant="outlined"
                >
                    Reply
                </Button>
            </Box>
        </Box>
    )
}

export default CommentInputArea