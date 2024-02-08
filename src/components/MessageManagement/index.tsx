import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import API, { apiRequest } from '../../apiConfig';

interface Message {
    messageId: number;
    userId: number;
    email: string;
    message: string;
    dateCreated: string;
    status: number;
}


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));


const MessageManagement = () => {

    const [messages, setMessages] = useState<Message[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiRequest(API.getAllMessages, {
                    method: 'GET',
                });
                console.log(response)

                if (!response || !response.ok) {
                    // Handle the case where response is undefined or the request was not successful
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                console.log(result)
                setMessages(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const handleButtonClick = async (messageId: Number, currentStatus: Number) => {
        try {
            console.log(messageId)
            console.log(currentStatus)
            const response = await apiRequest(API.toggleMessageStatus(messageId), {
                method: 'PATCH'
            });

            if (!response || !response.ok) {
                // Handle the case where response is undefined or the request was not successful
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            console.log(result)

            // Update the local state with the new status
            const updatedMessages = messages.map((msg) =>
                msg.messageId === messageId ? { ...msg, status: currentStatus === 1 ? 0 : 1 } : msg
            );
            setMessages(updatedMessages);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };


    return (


        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100vh"
        >
            <Grid container spacing={2} width="80%">
                {messages.map((message) => (
                    <React.Fragment key={message.messageId}>
                        <Grid xs={7}>
                            <Item>
                                <Typography variant="h6" color="black">
                                    {message.message}
                                </Typography>

                            </Item>
                        </Grid>
                        <Grid xs={3}>
                            <Item>
                                <Typography variant="body2" color="black">
                                    {`Sent by ${message.email}`}
                                </Typography>
                                <Typography variant="body2" color="black">
                                    {`on ${message.dateCreated}`}
                                </Typography>
                                <Typography variant="body2" color={message.status === 1 ? 'error' : 'primary'}>
                                    {message.status === 1 ? 'Closed' : 'Open'}
                                </Typography>

                            </Item>
                        </Grid>
                        <Grid xs={2}>
                            <Item>
                                <Button variant="contained" color={message.status === 0 ? 'error' : 'primary'} onClick={() => handleButtonClick(message.messageId, message.status)}>
                                    {message.status === 0 ? 'Closed' : 'Open'}
                                </Button>
                            </Item>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );






}

export default MessageManagement

