import Add from '@mui/icons-material/Add'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import { Dropdown, Button, Menu, MenuButton } from '@mui/joy'
import { Box, Grid, MenuItem } from '@mui/material'
import PostCard from './PostCard'
import { selectBannedPostIds, selectDeletedPostIds, selectPostIds, selectPublishedPostIds } from '../../store/selectors/post.selector'
import { useAppSelector, useThunkDispatch } from '../../store/hooks'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { loadPosts } from '../../store/actions/post.action'
import { BANNED, DELETED, PUBLISHED } from '../../constants'
import { TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../../types'

const PostThread = ({type, selector}: {type:string, selector: (state: RootState) => string[]}) => {
    
    const postIds = useAppSelector(selector);
    

    return (
    
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                <Box display="flex" justifyContent="flex-start">
                    <Button 
                        variant="outlined" 
                        startDecorator={<Add /> }
                        component={Link} 
                        to="/post"
                    >
                        Add a Post
                    </Button>
                </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Box display="flex" justifyContent="flex-end">
                    <Button variant="outlined">Reset</Button>
                    <Dropdown>
                        <MenuButton endDecorator={<ArrowDropDown />}>Sort By</MenuButton>
                        <Menu>
                            <MenuItem>Most Replies</MenuItem>
                            <MenuItem>Date Created</MenuItem>
                        </Menu>
                    </Dropdown>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', maxHeight: 12 }}>
                {postIds.map( (id) => 
                    <PostCard 
                        key={id}
                        id={id}
                        type={type}
                    />
                )}
            </Box>
            {/* <Pagination count={count} onChange={handleChange}/> */}
        </>
            
    )
}

export default PostThread