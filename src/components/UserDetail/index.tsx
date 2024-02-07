import React, { useEffect } from 'react';
import { HistoryModel, UserModel } from '../../types';
import { useState } from 'react'
import { Typography } from '@mui/material';
import { showFormattedDate } from '../util';
import { Grid, Avatar, Button } from '@mui/material';
import { EditUserProfile } from './EditUserProfile/EditUserProfile';

const token = localStorage.getItem("token");

export const UserProfile = () => {
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const [user, setUser] = useState<UserModel>({
        userId: 0,
        email: '',
        firstName: '',
        lastName: '',
        active: false,
        dateJoined: '',
        role: '',
        profileImageURL: '',
    })

    const [history, setHistory] = useState<HistoryModel[]>([])

    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleOpenEditModal = () => {
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleSaveUser = async (editedUser: UserModel) => {
        setUser(editedUser);
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NSIsInBlcm1pc3Npb25zIjpbeyJhdXRob3JpdHkiOiJST0xFX1VOVkVSSUZJRUQifV0sImV4cCI6MTcwODIwNjQ5NCwiaWF0IjoxNzA3MzQyNDk0fQ.Qk83j3p8R3YNvuxIEor-RQflmsnBR3D9YJGde19p60o"; // Retrieve your token from storage

        const url = 'http://localhost:8888/api/user/email'; // Replace with your actual endpoint
        const data = {
            email: editedUser.email // Make sure the email is correctly formatted
        };

        try {
            const response = await fetch(url, {
                method: 'PATCH', // Assuming you're creating or updating data
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Assuming a Bearer token
                },
                body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json(); // Assuming the server responds with JSON
            console.log(responseData); // Do something with the response data
            setUpdateTrigger(prev => prev + 1)
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            const apiEndpoint = "http://localhost:8888/api/user"; // Your API endpoint
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'GET', // or 'POST'
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Assuming a Bearer token
                    },
                });
                // console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }


                // const result = JSON.parse(response.data)
                const result = await response.json();
                const a = result.data as UserModel;
                // const convertData = {
                //     ...a,
                //     dateJoined: new Date(result.data.dateJoined.toLocaleDateString)
                // }

                setUser(a);
                console.log(user)
            } catch (error) {
                console.error("Fetching data failed:", error);
                // Handle errors, such as by setting an error state (not shown here)
            }
        };

        const fetchHistory = async () => {
            const apiEndpoint = "http://localhost:8888/api/history/user"; // Your API endpoint

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'GET', // or 'POST'
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Assuming a Bearer token
                    },
                });
                // console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }


                // const result = JSON.parse(response.data)
                const result = await response.json();
                const a = result.data as HistoryModel[]
                console.log(a)

                setHistory(a);
                console.log(history)
            } catch (error) {
                console.error("Fetching data failed:", error);
                // Handle errors, such as by setting an error state (not shown here)
            }
        }

        fetchUser();
        fetchHistory();

    }, [updateTrigger])

    const userInfoItems = (
        <React.Fragment>
            <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
            <Typography variant="body2">{user.email}</Typography>
            <label> {showFormattedDate(user.dateJoined)}</label>

            <Typography variant="body2">Role: {user.role}</Typography>
            <Typography variant="body2">Status: {user.active ? 'Active' : 'Inactive'}</Typography>
        </React.Fragment>
    );

    // Generate list items for view history
    // const viewHistoryList = (
    //     <List>
    //         {user.history.map((historyItem, index) => (
    //             <ListItem key={index}>
    //                 <ListItemText primary={historyItem.title} secondary={historyItem.date.toLocaleDateString()} />
    //             </ListItem>
    //         ))}
    //     </List>
    // );

    return (
        <Grid sx={{ paddingTop: "2rem" }} container spacing={2}>
            <Grid item xs={5}>
                <Grid container spacing={1}>

                    <Grid item xs={12} style={{ backgroundColor: "lightgrey" }}>
                        <Avatar
                            src={user.profileImageURL}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Grid>
                            {userInfoItems}
                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            onClick={handleOpenEditModal}
                        >Edit Profile</Button>
                    </Grid>
                    <EditUserProfile
                        open={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        user={user}
                        onSave={handleSaveUser}
                    />
                </Grid>
            </Grid>
            <Grid item xs={8}>

            </Grid>

        </Grid>
    );
}