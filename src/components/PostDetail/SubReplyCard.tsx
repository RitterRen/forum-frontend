import React from 'react'
import { ISubReply } from '../../types'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'

const SubReplyCard = ({subReply}: {subReply: ISubReply}) => {
  return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="Cindy Baker" src={subReply.user.profileImageURL} />
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
                {subReply.user.name}
            </Typography>
            <Typography 
                sx={{ ml: 2 }} 
                component="span" 
                variant='body2'
                color="text.secondary"
            >
                {subReply.dateCreated}
            </Typography>
            </React.Fragment>
        }
        secondary={
            subReply.comment
        }
        />
    </ListItem>
  )
}

export default SubReplyCard