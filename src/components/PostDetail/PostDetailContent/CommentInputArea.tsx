import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { inlineWrapper } from '../../../styles';
import { useAppSelector, useThunkDispatch } from '../../../store/hooks';
import { replyPost } from '../../../store/actions/post.action';
import { selectUser } from '../../../store/selectors/user.selector';
import { selectPostById } from '../../../store/selectors/post.selector';

const CommentInputArea = ({id, replyUserId, type}: {id:string, replyUserId: number, type: number}) => {
    const [commentContent, setCommentContent] = useState("");
    const user = useAppSelector(selectUser);
    const post = useAppSelector(selectPostById(id));

    const dispatch = useThunkDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentContent(e.target.value)
    }

    const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            id: id,
            comment: commentContent,
            user: user,
            type: type,
            userId: replyUserId
        }
        dispatch(replyPost(payload));
        setCommentContent("");
    };


    return (
        <Box component="form" onSubmit={handleReply} noValidate sx={inlineWrapper}>
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