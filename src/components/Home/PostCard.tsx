import { ButtonGroup, Card, CardActionArea, CardHeader, IconButton } from '@mui/material'
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/selectors/user.selector';
import MenuButtons from './MenuButtons';
import { ROLE_ADMIN, ROLE_SUPER } from '../../constants';
import { selectPostById } from '../../store/selectors/post.selector';
import { createHistory } from '../../store/actions/post.action';


interface IProps {
    id: string,
    type: string
}



const PostCard = (props: IProps) => {
    const user = useAppSelector(selectUser);
    const isAdmin = user.role === ROLE_ADMIN || user.role === ROLE_SUPER;
    const post = useAppSelector(selectPostById(props.id));
    const navigate = useNavigate(); 
    const dispatch = useThunkDispatch();

    return (
        <Card sx={{ width: '100%', margin: 1 }}>
            <CardActionArea onClick={() => {
                dispatch(createHistory(user.userId, props.id));
                navigate(`/post/${props.id}`);
            }} >
            <CardHeader
                title={`${post.user.firstName} ${post.user.lastName}`}
                avatar={<PeopleIcon/>}
                action={ isAdmin? <MenuButtons id={props.id} type={props.type}/>: null }
                subheaderTypographyProps={{fontSize: 12, align: 'left'}}
                subheader={post.dateCreated}
            />
            <CardHeader 
                title={post.title} 
                titleTypographyProps={{ variant:"h6" }}
                secondaryaction={
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
