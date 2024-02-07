import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const fakeMessages = [
    {
        message_id: 1,
        user_id: 101,
        email: 'john.doe@example.com',
        message: 'Hello there!',
        date_created: '2022-01-01T08:00:00',
        status: 1,
    },
    {
        message_id: 2,
        user_id: 102,
        email: 'alice.smith@example.com',
        message: 'How are you?',
        date_created: '2022-01-02T10:30:00',
        status: 1,
    },
    {
        message_id: 3,
        user_id: 103,
        email: 'bob.johnson@example.com',
        message: 'Meeting at 2 PM',
        date_created: '2022-01-03T14:15:00',
        status: 0,
    },
    {
        message_id: 4,
        user_id: 104,
        email: 'emily.brown@example.com',
        message: 'Check out this link!',
        date_created: '2022-01-04T16:45:00',
        status: 1,
    },
    {
        message_id: 5,
        user_id: 105,
        email: 'david.wilson@example.com',
        message: 'Reminder: Submit the report',
        date_created: '2022-01-05T18:30:00',
        status: 1,
    },
    {
        message_id: 6,
        user_id: 106,
        email: 'sophia.lee@example.com',
        message: 'Discussing project updates',
        date_created: '2022-01-06T20:00:00',
        status: 1,
    },
];

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
    // color: theme.palette.text.secondary,
}));


const MessageManagement = () => {

    const [messages, setMessages] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/data');
                const result = await response.json();
                setMessages(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const handleButtonClick = async (messageId:Number, currentStatus:Number) => {
        try {
          const response = await fetch(`https://api.example.com/messages/${messageId}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: currentStatus === 1 ? 0 : 1 }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update status');
          }
    
          // Update the local state with the new status
          const updatedMessages = fakeMessages.map((msg) =>
            msg.message_id === messageId ? { ...msg, status: currentStatus === 1 ? 0 : 1 } : msg
          );
        //   setMessages(updatedMessages);
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
                {fakeMessages.map((message) => (
                    <React.Fragment key={message.message_id}>
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
                                    {`on ${message.date_created}`}
                                </Typography>
                                <Typography variant="body2" color={message.status === 1 ? 'error' : 'primary'}>
                                    {message.status === 1 ? 'Closed' : 'Open'}
                                </Typography>

                            </Item>
                        </Grid>
                        <Grid xs={2}>
                            <Item>
                                <Button variant="contained" color={message.status === 0 ? 'error' : 'primary'} onClick={() => handleButtonClick(message.message_id, message.status)}>
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

