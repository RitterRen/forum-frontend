import { Box, Container } from '@mui/material'
import { Tabs, TabList, Tab, TabPanel } from '@mui/joy';

import MainContent from './MainContent';


const Home = () => {
    return (
        <Container component="main" maxWidth="lg">
            <Box>
                <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ mt: 8}}>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Banned</Tab>
                        <Tab>Deleted</Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <MainContent />
                    </TabPanel>
                    <TabPanel value={1}>
                        <MainContent />
                    </TabPanel>
                    <TabPanel value={2}>
                        <MainContent />
                    </TabPanel>
                </Tabs>
            </Box>
        </Container>
    )

}

export default Home