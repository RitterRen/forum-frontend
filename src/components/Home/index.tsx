import { Box, Container } from '@mui/material'
import { Tabs, TabList, Tab, TabPanel } from '@mui/joy';

import PostThread from './PostThread';
import { useEffect } from 'react';
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import { loadPosts } from '../../store/actions/post.action';
import { selectUser } from '../../store/selectors/user.selector';
import { ALL, BANNED, DELETED, HIDDEN, ROLE_ADMIN, ROLE_SUPER } from '../../constants';
import { selectBannedPostIds, selectDeletedPostIds, selectHiddenPostIds, selectPublishedPostIds } from '../../store/selectors/post.selector';
import { getUser } from '../../store/actions/user.action';


const Home = () => {
    const user = useAppSelector(selectUser);
    const isAdmin = user.role === ROLE_ADMIN || user.role === ROLE_SUPER;

    const dispatch = useThunkDispatch();
    useEffect(() => {
        if (user.userId == -1) {
            dispatch(getUser());
        }
        dispatch(loadPosts())
    }, [dispatch]);

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 8}}>
                {isAdmin?
                <Tabs aria-label="Basic tabs" defaultValue={0}>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Banned</Tab>
                        <Tab>Deleted</Tab>
                        <Tab>Hidden</Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <PostThread type={ALL} selector={selectPublishedPostIds}/>
                    </TabPanel>
                    <TabPanel value={1}>
                        <PostThread type={BANNED} selector={selectBannedPostIds}/>
                    </TabPanel>
                    <TabPanel value={2}>
                        <PostThread type={DELETED} selector={selectDeletedPostIds}/>
                    </TabPanel>
                    <TabPanel value={3}>
                        <PostThread type={HIDDEN} selector={selectHiddenPostIds}/>
                    </TabPanel>
                </Tabs> :
                <PostThread type={ALL} selector={selectPublishedPostIds}/>
                }
            </Box>
        </Container>
    )

}

export default Home