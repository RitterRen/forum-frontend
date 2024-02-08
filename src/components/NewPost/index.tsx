import { Textarea, Button } from '@mui/joy'
import { Container, Box, TextField, Typography, IconButton, Grid } from '@mui/material'
import React, { Dispatch, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentIcon from '@mui/icons-material/Attachment';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Link, useNavigate } from 'react-router-dom';
import { inlineWrapper } from '../../styles';
import { useThunkDispatch } from '../../store/hooks';
import { createPost } from '../../store/actions/post.action';
import { STATUS, apiRequest } from '../../apiConfig';
import { POST_PUBLISHED, POST_UNPUBLISHED, SUCCESS } from '../../constants';

export interface PostContent {
    title: string,
    content: string,
    attachments: string[],
    images: string[],
    status: string
}
const NewPost = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();
    const [postContent, setPostContent] = useState<PostContent>({
        title: "",
        content: "",
        attachments: [],
        images:[],
        status: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(prevPostContent => ({ ...prevPostContent, [e.target.name]: e.target.value }))
    }

    const handleSave = async () => {
        let uploads = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            uploads.push(uploadFile(formData, 0));
        }
        for (const image of images) {
            const formData = new FormData();
            formData.append('file', image);
            uploads.push(uploadFile(formData, 1));
        }
        
        await Promise.all(uploads)
        await dispatch(createPost({...postContent, status: POST_UNPUBLISHED}));
    }

    const uploadFile = async (formData: FormData, type: number) => {
        let resp = await apiRequest("http://localhost:8888/api/file/upload", {
            method: "POST",
            body: formData
        });
        let data = await resp?.json();
        const filename = data.data.split(" ")[2];
        console.log(`Done with ${filename}`);
        if (type == 0) {
            let newFiles = [...postContent.attachments];
            newFiles.push(filename)
            setPostContent({...postContent,attachments: newFiles })
        } else {
            let newImgaes = [...postContent.images];
            newImgaes.push(filename)
            setPostContent({...postContent,images: newImgaes })
        }
        return data;
    }

    const handlePublish = async () => {
        if (postContent.title === "" || postContent.content === "") {
            window.alert("Cannot create blank post");
            return;
        }
        let uploads = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            uploads.push(uploadFile(formData, 0));
        }
        for (const image of images) {
            const formData = new FormData();
            formData.append('file', image);
            uploads.push(uploadFile(formData, 1));
        }
        
        await Promise.all(uploads)
        await dispatch(createPost({...postContent, status: POST_PUBLISHED}));

        navigate('/home');
    }
    
    const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = [...files];
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        chosenFiles.forEach( (f) => newFiles.push(f));
        setFiles(newFiles);
    }

    const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = [...images];
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        chosenFiles.forEach( (f) => newFiles.push(f));
        setImages(newFiles);
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
            <Box>
                {files.map((f: File) =>
                    <Box sx={inlineWrapper}>
                        <AttachmentIcon />
                        <span>{f.name}</span>
                    </Box>
                )}
                {images.map((f: File) =>
                    <Box sx={inlineWrapper}>
                        <InsertPhotoIcon />
                        <span>{f.name}</span>
                    </Box>
                )}
            </Box>
            <Grid container mt={1} spacing={2}>
            <Grid item xs={4} md={4}>
                <label htmlFor="icon-button-file">
                    <input 
                        style={{display: "none"}} 
                        id="icon-button-file" 
                        type="file" 
                        onChange={addFile} 
                    />
                    <IconButton
                        aria-label="upload file"
                        component="span"
                    >
                        <AttachFileIcon />
                    </IconButton>
                </label>
                <label htmlFor="icon-button-image">
                    <input 
                        style={{display: "none"}} 
                        accept="image/*" 
                        id="icon-button-image" 
                        type="file" 
                        onChange={addImage}
                    />
                    <IconButton 
                        aria-label="Add image"
                        component="span"
                    >
                        <InsertPhotoIcon />
                    </IconButton>
                </label>
            </Grid>
            <Grid item xs={8} md={8}>
                <Box display='flex' justifyContent='flex-end'>
                    <Button variant="outlined" onClick={handleSave}>
                        Save as Draft
                    </Button>
                    <Button variant="outlined" onClick={handlePublish}>
                        Publish
                    </Button>
                </Box>
            </Grid>
        </Grid>
            
        </Box>
    </Container>
    )
}

export default NewPost