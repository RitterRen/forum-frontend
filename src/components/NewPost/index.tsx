import { Textarea, Button } from '@mui/joy'
import { Container, Box, TextField, Typography, IconButton, Grid } from '@mui/material'
import React, { Dispatch, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentIcon from '@mui/icons-material/Attachment';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Link } from 'react-router-dom';
import { inlineWrapper } from '../../styles';

const NewPost = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [postContent, setPostContent] = useState({
        title: "",
        content: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(prevPostContent => ({ ...prevPostContent, [e.target.name]: e.target.value }))
    }

    const handleSave = () => {
        console.log(postContent);
        // const formData = new FormData();
        // files.forEach((file) => formData.append('attachments', file));
        // images.forEach((image) => formData.append('images', image));
    }

    const handlePublish = () => {
        const formData = new FormData();
        files.forEach((file) => formData.append('attachments', file));
        images.forEach((image) => formData.append('images', image));
        
        fetch("http://localhost:8888/api/auth/register", {})
        .then( res => res.json())
        .then( res=> {
            
        });
    }
    
    const addFile = (e: React.ChangeEvent<HTMLInputElement>, setter: Dispatch<File[]>) => {
        const newFiles = [...files];
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        chosenFiles.forEach( (f) => newFiles.push(f));
        setter(newFiles);
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
                        onChange={(e) => addFile(e, setFiles)} 
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
                        onChange={(e) => addFile(e, setImages)}
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