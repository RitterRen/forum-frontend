import React, { useState } from 'react'
import { IPostReply } from '../../../types'
import { Divider, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, IconButton, Collapse, List, Box } from '@mui/material'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import KeyboardArrowUpIcon from  "@mui/icons-material/KeyboardArrowUp"; 
import SubReplyCard from './SubReplyCard';
import CommentInputArea from './CommentInputArea';
import { inlineWrapper } from '../../../styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useThunkDispatch } from '../../../store/hooks';
import { selectPostById } from '../../../store/selectors/post.selector';
import { POST_PUBLISHED } from '../../../constants';


const ReplyCard = ({reply, postId}: {reply: IPostReply, postId: string}) => {
    const [open, setOpen] = useState(false); 
    const dispatch = useThunkDispatch();
    const post = useAppSelector(selectPostById(postId));

    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        // dispatch(deleteReply())
    }   

    return (
    <>
        <ListItem 
            alignItems="flex-start"
            secondaryAction={
                <Box sx={inlineWrapper}>
                    <IconButton 
                        edge="end" 
                        aria-label="comments" 
                        onClick={() => setOpen(!open)} 
                    >
                        {open? <KeyboardArrowUpIcon/>
                            : <ChatBubbleOutlineOutlinedIcon />}
                    </IconButton>
                    <IconButton 
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
        >
            <ListItemAvatar>
            <Avatar alt="Cindy Baker" src={reply.user.profileImageURL} />
            </ListItemAvatar>
            <ListItemText
            primary={
                <React.Fragment>
                    <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                >
                    {`${reply.user.firstName} ${reply.user.lastName}`}
                </Typography>
                <Typography 
                    sx={{ ml: 2 }} 
                    component="span" 
                    variant='body2'
                    color="text.secondary"
                >
                    {reply.dateCreated}
                </Typography>
                </React.Fragment>
            }
            secondary={
                <React.Fragment>
                    {reply.comment}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List>
                            {reply.subReplies.map((subReply, i) => 
                                <SubReplyCard 
                                    key={i}
                                    subReply={subReply}
                                />
                            )}
                        </List>
                        { post.status === POST_PUBLISHED ? <CommentInputArea id={postId} replyUserId={reply.user.userId} type={1}/>: null}
                    </Collapse>
                </React.Fragment>
                
            }
            />
        </ListItem>
        
        <Divider variant="inset" component="li" />
    </>
    )
}

export default ReplyCard