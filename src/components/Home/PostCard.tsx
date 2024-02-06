import { ListItem, Avatar, ListItemAvatar, ListItemText, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { IPost } from '../../types';


interface IProps {
    post: IPost;
}



const Posts = (props: IProps) => {
    const isAdmin = true;
    const { username, title, date } = props.post;
    return (
        // <Box sx={postCardWrapper}>
        //     <Box sx={postCardLayout}>
        //         <PostInfoContent post={props.post} />
        //         <Typography sx={postCardHeader} variant="h6">
        //         {item.desc}
        //         </Typography>
        //         {item.image && <ImageContent image={item.image} />}
        //     </Box>
        // </Box>
        <ListItem
            secondaryAction={ 
                isAdmin ?
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton> : 
                null
          }
        >
            <ListItemAvatar>
            {/* <p>{username}</p> */}
            <Avatar>
                <ImageIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={title} secondary={date} />
        </ListItem>
    )
}

export default Posts