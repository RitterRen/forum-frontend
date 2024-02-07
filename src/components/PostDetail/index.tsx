import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectPostById } from '../../store/selectors/post.selector'
import { Box, Card, CardHeader, Avatar, CardContent, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import ReplyList from './ReplyList';
import CommentInputArea from './CommentInputArea';
import MenuDropDown from './MenuDropDown';

const PostDetail = () => {
    const params = useParams();
    const post = useAppSelector(selectPostById(params.id!))

    return (
        <Container component="main" maxWidth="md">
        <Box sx={{ mt: 8}}>
            <Card>
                <CardHeader
                    title={post.user.name}
                    action={ <MenuDropDown /> }
                    avatar={<Avatar alt={post.user.name} src={post.user.profileImageURL} />}
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
                </CardContent>
            </Card>
            <CommentInputArea/>
            <ReplyList id={params.id!}/>
        </Box>
        </Container>
    )
}

export default PostDetail