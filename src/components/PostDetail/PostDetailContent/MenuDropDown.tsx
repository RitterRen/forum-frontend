import React from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch, useAppSelector, useThunkDispatch } from '../../../store/hooks';
import { selectUser } from '../../../store/selectors/user.selector';
import { PUBLISHED } from '../../../constants';
import { deletePost, hidePost, recoverPost } from '../../../store/actions/post.action';
import { useNavigate } from 'react-router-dom';


const MenuDropDown = ({id, accessibility}: {id: string, accessibility: string}) => {
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        navigate('/edit/' + id);
    };

    const handleDelete = () => {
        setAnchorEl(null);
        dispatch(deletePost(id))
        .then(() => navigate('/home'));
    };
    const handleHide = () => {
        setAnchorEl(null);
        if (accessibility === PUBLISHED)
            dispatch(hidePost(id));
        else
            dispatch(recoverPost(id));
    };

    return (
    <>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            <MenuItem onClick={handleHide}>
                { accessibility === PUBLISHED ? 'Hide': 'Publish' }
            </MenuItem>
        </Menu>
    </>
    )
}

export default MenuDropDown