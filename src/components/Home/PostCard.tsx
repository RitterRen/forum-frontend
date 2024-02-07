import { Card, CardActionArea, CardHeader, IconButton } from '@mui/material'
import { useAppSelector } from '../../store/hooks';
import { selectPostById } from '../../store/selectors/post.selector';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';


interface IProps {
    id: string
}



const PostCard = (props: IProps) => {
    const post = useAppSelector(selectPostById(props.id));
    return (
        <Card sx={{ width: '100%', margin: 1 }}>
            <CardActionArea component={RouterLink} to={`/post/${props.id}`}>
            <CardHeader
                title={post.user.name}
                avatar={<PeopleIcon/>}
                subheaderTypographyProps={{fontSize: 12, align: 'left'}}
                subheader={post.dateCreated}
            />
            <CardHeader 
                title={post.title} 
                titleTypographyProps={{ variant:"h6" }}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
            />
            </CardActionArea>
        </Card>
    )
}

export default PostCard
