import React, { useState } from 'react'
import { IPostReply } from '../../types'
import { Divider, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, IconButton, Collapse, List } from '@mui/material'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import KeyboardArrowUpIcon from  "@mui/icons-material/KeyboardArrowUp"; 
import SubReplyCard from './SubReplyCard';
import CommentInputArea from './CommentInputArea';


const ReplyCard = ({reply}: {reply: IPostReply}) => {
    const [open, setOpen] = useState(false); 
    return (
    <>
        <ListItem 
            alignItems="flex-start"
            secondaryAction={
                <IconButton 
                    edge="end" 
                    aria-label="comments" 
                    onClick={() => setOpen(!open)} 
                >
                    {open? <KeyboardArrowUpIcon/>
                        : <ChatBubbleOutlineOutlinedIcon />}
                </IconButton>
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
                    {reply.user.name}
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
                        <CommentInputArea />
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