import { ButtonGroup, Button } from '@mui/material'
import React from 'react'
import { ALL, BANNED, DELETED } from '../../constants'
import { useThunkDispatch } from '../../store/hooks'
import { banPost, recoverPost } from '../../store/actions/post.action'

interface IProps {
    type: string,
    id: string
}
const MenuButtons = ({type, id}: IProps) => {
    const dispatch = useThunkDispatch();
    const handleBan = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        dispatch(banPost(id));
    };

    const handleUnban = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        console.log("child clicked");
        dispatch(recoverPost(id));
    };

    const handleRecover = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        dispatch(recoverPost(id));
    };
  return (
    <>
        {type === ALL ? 
            <Button variant="outlined" onClick={handleBan}>Ban</Button> : null }
        {type === ALL || type === BANNED  ? 
            <Button variant="outlined" onClick={handleUnban}>Unban</Button> : null }
        {type === DELETED ? 
            <Button variant="outlined" onClick={handleRecover}>Recover</Button> : null }
    </>
  )
}

export default MenuButtons

