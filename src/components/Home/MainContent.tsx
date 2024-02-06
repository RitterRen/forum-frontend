import Add from '@mui/icons-material/Add'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import { Dropdown, Button, Menu, MenuButton } from '@mui/joy'
import { Box, Grid, MenuItem, List, Pagination } from '@mui/material'
import React, { useState } from 'react'
import PostCard from './PostCard'
import usePagination from './pagination'

const MainContent = () => {
    const isAdmin = true;
    const posts = [
        {
          "username": "JohnDoe",
          "title": "First Post",
          "date": "2024-02-04T13:00:00Z"
        },
        {
          "username": "AliceSmith",
          "title": "Hello World",
          "date": "2024-02-04T14:15:00Z"
        },
        {
          "username": "BobJohnson",
          "title": "Coding Adventures",
          "date": "2024-02-04T15:30:00Z"
        },
        {
          "username": "EmilyBrown",
          "title": "Travel Diaries",
          "date": "2024-02-04T16:45:00Z"
        },
        {
          "username": "DavidWilson",
          "title": "Tech Trends",
          "date": "2024-02-04T17:00:00Z"
        },
        {
          "username": "SophiaLee",
          "title": "Gardening Tips",
          "date": "2024-02-04T18:20:00Z"
        },
        {
          "username": "MichaelClark",
          "title": "Fitness Journey",
          "date": "2024-02-04T19:35:00Z"
        },
        {
          "username": "EmmaMartinez",
          "title": "Healthy Recipes",
          "date": "2024-02-04T20:50:00Z"
        },
        {
          "username": "JamesTaylor",
          "title": "Book Recommendations",
          "date": "2024-02-04T21:10:00Z"
        },
        {
          "username": "OliviaAnderson",
          "title": "DIY Projects",
          "date": "2024-02-04T22:25:00Z"
        }
    ]

      let [page, setPage] = useState(1);
      const PER_PAGE = 10;
      const count = Math.ceil(posts.length / PER_PAGE);
      const data = usePagination(posts, PER_PAGE);
  
      const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
          setPage(p);
          data.jump(p);
      };

  return (
    
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                <Box display="flex" justifyContent="flex-start">
                    <Button variant="outlined" startDecorator={<Add />}>Add a Post</Button>
                </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Button variant="outlined">Reset</Button>
                    <Dropdown>
                        <MenuButton endDecorator={<ArrowDropDown />}>Sort By</MenuButton>
                        <Menu>
                            <MenuItem>Replies</MenuItem>
                            <MenuItem>Date Created</MenuItem>
                        </Menu>
                    </Dropdown>
                </Grid>
            </Grid>
            <List sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                {data.currentData().map( (post, id) => 
                    <PostCard 
                        key={id}
                        post={post}
                    />
                )}
            </List>
            <Pagination count={count} onChange={handleChange}/>
        </>
            
    )
}

export default MainContent