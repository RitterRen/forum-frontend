import { Box, Container } from '@mui/material'
import { Tabs, TabList, Tab, TabPanel } from '@mui/joy';

import PostThread from './PostThread';


const Home = () => {
    const isAdmin = false;
    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 8}}>
                {isAdmin ?
                <Tabs aria-label="Basic tabs" defaultValue={0}>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Banned</Tab>
                        <Tab>Deleted</Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <PostThread />
                    </TabPanel>
                    <TabPanel value={1}>
                        <PostThread />
                    </TabPanel>
                    <TabPanel value={2}>
                        <PostThread />
                    </TabPanel>
                </Tabs> :
                <PostThread />
                }
            </Box>
        </Container>
    )

}

export default Home