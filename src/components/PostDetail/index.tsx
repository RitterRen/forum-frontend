import React, { useEffect } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectPostById } from '../../store/selectors/post.selector'
import { Box, Card, CardHeader, Avatar, CardContent, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import ReplyList from './PostDetailContent/ReplyList';
import CommentInputArea from './PostDetailContent/CommentInputArea';
import MenuDropDown from './PostDetailContent/MenuDropDown';
import { selectUser } from '../../store/selectors/user.selector';
import { POST_HIDDEN, POST_PUBLISHED } from '../../constants';
import { inlineWrapper } from '../../styles';
import AttachmentIcon from '@mui/icons-material/Attachment';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const PostDetail = () => {
    const params = useParams();
    let post = useAppSelector(selectPostById(params.id!))
    let user = useAppSelector(selectUser);

    const handleDownload = (fname: string) => {
        fetch("http://localhost:8888/api/file/download/" + fname)
        .then((res) => {
            res.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = fname;
                alink.click();
            });
        });
    }
    

    return (
        <Container component="main" maxWidth="md">
        <Box sx={{ mt: 8}}>
            <Card>
                <CardHeader
                    title={
                        <Box sx={inlineWrapper}>
                            <span>{post.user.firstName} {post.user.lastName}</span>
                            {post.status === POST_HIDDEN ? <VisibilityOffOutlinedIcon sx={{ml: 1}}/>: null}
                        </Box>
                    }
                    action={ post.user.userId == user.userId ? <MenuDropDown id={post.postId} accessibility={post.status} /> : null }
                    avatar={
                    <Avatar 
                        alt={`${post.user.firstName} ${post.user.lastName}`} 
                        src={post.user.profileImageURL} 
                    />}
                    subheader={
                        <React.Fragment>
                            <span>Date Created: </span>
                            <Typography
                                sx={{ display: 'inline' }}
                                variant='body2'
                                component="span"
                            >
                                {post.dateCreated}
                            </Typography>
                            <br/>
                            {post.dateModified && 
                                <React.Fragment>
                                <span>Last Modified: </span>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    variant='body2'
                                    component="span"
                                >
                                    {post.dateModified}
                                </Typography>
                                </React.Fragment>
                             }
                        </React.Fragment>
                    }
                />
                <CardHeader 
                    title={post.title} 
                    titleTypographyProps={{ variant:"h5" }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.content}
                    </Typography>
                    <Box>
                        {post.attachments.map((fname) =>
                            <Box sx={inlineWrapper} onClick={() => handleDownload(fname)}>
                                <AttachmentIcon />
                                <span>{fname}</span>
                            </Box>
                        )}
                        {post.images.map((fname) =>
                            <Box sx={inlineWrapper} onClick={() => handleDownload(fname)}>
                                <InsertPhotoIcon />
                                <span>{fname}</span>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
            { post.status === POST_PUBLISHED ? <CommentInputArea id={params.id!} type={0} replyUserId={-1}/> : null }
            <ReplyList id={params.id!}/>
        </Box>
        </Container>
    )
}

export default PostDetail