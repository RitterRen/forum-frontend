import { Box, Button, ButtonGroup, Grid, IconButton, Input } from '@mui/material'
import React, { useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { inlineWrapper } from '../../styles';


const PostFooter = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<File[]>([]);
    
    const addFile = (e: React.ChangeEvent<HTMLInputElement>, setter: any) => {
        const newFiles = [...files];
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        chosenFiles.forEach( (f) => newFiles.push(f));
        setter(newFiles);
    }


    const handleSave = () => {
        const formData = new FormData();
        files.forEach((file) => formData.append('attachments', file));
        images.forEach((image) => formData.append('images', image));
    }

    const handlePublish = () => {
        
    }


    return (
        <>
        <Grid container mt={1} spacing={2}>
            <Grid item md={12}>
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
            </Grid>
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
        
        </>
    )
}

export default PostFooter