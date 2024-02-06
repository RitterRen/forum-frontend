import React, {useState} from 'react';
import { showFormattedDate } from '../../../src/utils';
import {Post} from "../../Model/SharedModel/SharedModels";
import {RepliesList} from "./RepliesList"; // Assume this is a utility function you create to format dates
import './index.css'
import {ReplyForm} from "./ReplyForm";
import {Card, CardActions, CardContent, CardMedia, Divider} from '@mui/material'
import Typography from "@mui/material/Typography";
import {Button} from "@mantine/core";
import Box from "@mui/material/Box";

interface PostDetailProps {
    post: Post;
}

interface ReplyFormProps {
    onSubmit: (message: string) => void; // Handle reply submission
}
export const PostDetail: React.FC<PostDetailProps> = ({ post}) =>{

    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        function onSubmit(message: string) {

        }

        onSubmit(message);
        setMessage(''); // Reset message input after submission
    };

    return (
        <div style={{width:"98%", paddingTop: "2rem",margin:"auto", backgroundColor:"white"}}>
            <Box
                sx={{ maxWidth: "100%" }}
                boxShadow={10}
            >

                <Box
                    sx={{ maxWidth: "100%", padding:"2px" }}
                    boxShadow={2}
                >
                    <CardContent>
                        <Typography align="left" variant="h5" component="div">
                            {post.title}
                        </Typography>
                        <Typography align="right" variant="body1" component="div">
                            <span>Post Date: </span>{showFormattedDate(post.postDate)}
                        </Typography>

                        <Typography align="left" variant="body2" color="text.primary" component="div">
                            {post.description}
                        </Typography>
                    </CardContent>

                </Box>
                <Divider sx={{borderWidth:"8px"}} orientation="vertical" flexItem />

                <Box
                    alignItems="right"
                    sx={{ maxWidth: "90%", padding:"2px", justifyContent:"right", align:"right" }}
                    boxShadow={2}
                >
                    <ReplyForm onSubmit={handleSubmit}/>
                </Box>
                <Divider sx={{borderWidth:"8px"}} orientation="vertical" flexItem />
                <Box
                    sx={{ maxWidth: "100%", padding:"2px" }}
                    boxShadow={2}
                >

                    <RepliesList replies={post.replies} />
                </Box>
            </Box>
        </div>

    )
};