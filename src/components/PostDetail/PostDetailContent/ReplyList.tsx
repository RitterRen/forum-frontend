import { Box, CircularProgressTypeMap, List } from '@mui/joy'
import React, { useEffect } from 'react'
import { IPostReply, PostPayload } from '../../../types'
import { useAppSelector } from '../../../store/hooks'
import { selectPost, selectPostById } from '../../../store/selectors/post.selector'
import ReplyCard from './ReplyCard'


const ReplyList = ( {id}: {id:string} ) => {
    const post = useAppSelector(selectPostById(id));

    return (
        <Box>
            <List>
            {post.postReplies.map( (reply: IPostReply, i: number) => 
                <ReplyCard 
                    key={i}
                    reply={reply}
                    postId={id}
                />
            )}
            </List>
        </Box>
    )
}

export default ReplyList