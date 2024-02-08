import { Textarea, Button } from '@mui/joy'
import { Container, Box, TextField, Typography, IconButton, Grid } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentIcon from '@mui/icons-material/Attachment';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { inlineWrapper } from '../../styles';
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import { createPost, editPost } from '../../store/actions/post.action';
import { STATUS, apiRequest } from '../../apiConfig';
import { POST_PUBLISHED, POST_UNPUBLISHED, SUCCESS } from '../../constants';
import { selectPostById } from '../../store/selectors/post.selector';
import { selectUser } from '../../store/selectors/user.selector';

export interface EditPostContent {
    postId: string
    title: string,
    content: string,
    status: string,
    dateCreated: string,
    archived: boolean
}

const EditPost = () => {
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const post = useAppSelector(selectPostById(params.id!));
    const user = useAppSelector(selectUser);

    const [postContent, setPostContent] = useState<EditPostContent>({
        postId: post.postId,
        title: "",
        content: "",
        status:"",
        dateCreated:"",
        archived: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(prevPostContent => ({ ...prevPostContent, [e.target.name]: e.target.value }))
    }


    const handleEdit = () => {
        
        dispatch(editPost({
            payload: {
                ...postContent, 
                status: post.status, 
                dateCreated: post.dateCreated, 
                archived: post.archived,
                postId: post.postId,
            }, 
            id: post.postId,
            user: user
        }))
        .then(() => navigate(-1));
    }
    

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
                onChange={handleChange}
                autoFocus
            />
            <TextField 
                sx={{ mt:2, width:'100%' }}
                multiline={true}
                minRows={6}
                maxRows={6}
                name="content"
                onChange={handleChange}
                placeholder="Write something here ..."
            />
            
            <Box display='flex' justifyContent='flex-end'>
                <Button variant="outlined" onClick={handleEdit}>
                    Edit
                </Button>
            </Box>
        </Box>
    </Container>
    )
}

export default EditPost