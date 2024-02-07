import { Box, CircularProgressTypeMap, List } from '@mui/joy'
import React from 'react'
import { PostPayload } from '../../types'
import { useAppSelector } from '../../store/hooks'
import { selectPostById } from '../../store/selectors/post.selector'
import ReplyCard from './ReplyCard'

interface IProps {
    id: string
}

const ReplyList = ( {id}: {id:string} ) => {
    const post = useAppSelector(selectPostById(id));

    return (
        <Box>
            <List>
            {post.postReplies.map( (reply, i) => 
                <ReplyCard 
                    key={i}
                    reply={reply}
                />
            )}
            </List>
        </Box>
    )
}

export default ReplyList