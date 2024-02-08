import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { HistoryModel, UserModel } from '../../types';
import { useState } from 'react'
import { Typography } from '@mui/material';
import { showFormattedDate } from '../util';
import { Grid, Avatar, List, ListItem, ListItemText, Paper, DialogContentText } from '@mui/material';
import { EditUserProfile } from './EditUserProfile/EditUserProfile';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
// import './userProfile.css';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const token = localStorage.getItem("token");

export const UserProfile = () => {
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [verifyCode, setVerifyCode] = useState('');

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
    const [file, setFile] = useState<File | null>(null);
    const [link, setLink] = useState('');

    const [history, setHistory] = useState<HistoryModel[]>([])

    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const [openVerifyDialog, setOpenVerifyDialog] = useState(false);

    const [openFileUpload, setOpenFileUpload] = useState(false);

    const onOpenFileUpload = () => setOpenFileUpload(true)
    const onCloseFileUpload = () => setOpenFileUpload(false);

    const handleOpenVerifyDialog = () => {
        setOpenVerifyDialog(true);
    };

    const handleCloseVerifyDialog = () => {
        setOpenVerifyDialog(false);
    };

    const handleVerify = () => {
        // Implementation for handling the verification code
        const fetchVerifyCode = async () => {
            const apiEndpoint = `http://localhost:8888/api/user/email/auth/${verifyCode}`;
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Assuming a Bearer token
                    },
                });
                // console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const responseData = await response.json(); // Assuming the server responds with JSON
                console.log(responseData); // Do something with the response data
                setUpdateTrigger(prev => prev + 1)

            } catch (e) {
                console.log(e)
            }
        }
        console.log(verifyCode)
        fetchVerifyCode();
        handleCloseVerifyDialog();
    };

    const handlerVerifyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setVerifyCode(value)
    }

    const handleOpenEditModal = () => {
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleSaveUser = async (editedUser: UserModel) => {
        setUser(editedUser);
        const token = localStorage.getItem("token")
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

    const handlerImageUpload = () => {
        setOpenFileUpload(true)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };


    const handleUploadImageToBackend = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(file)
        const apiEndpoint = 'http://localhost:8888/api/file/upload';

        // Headers for fetch call
        const headers = new Headers({
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        });

        // Use FormData for file upload
        let body: FormData | URLSearchParams;

        if (file) { // If there's a file, append it to the FormData
            body = new FormData();
            body.append('file', file);
        } else if (link) { // If there's a link, use URLSearchParams or a JSON payload
            body = new URLSearchParams();
            body.append('link', link);
        } else {
            console.error('No file or link to upload');
            onCloseFileUpload()
            return;
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: headers,
                body: body,
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
                window.alert(responseData.data)
                onCloseFileUpload();
                // Handle successful response
            } else {
                console.error('Upload failed:', response.statusText);
                // Handle errors
            }
        } catch (error) {
            console.error('Network error:', error);
        }

    }

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
                setHistory(a);
            } catch (error) {
                console.error("Fetching data failed:", error);
                // Handle errors, such as by setting an error state (not shown here)
            }
        }

        fetchUser();

        fetchHistory();

    }, [updateTrigger])

    const userInfoItems = (
        <Paper>
            <Grid container spacing={2}>
                <Grid container item xs={12}>
                    <Grid item xs={5} />
                    <Grid item xs={4}>
                        <Box className="profile-image-overlay">
                            <Avatar
                                className="profile-image"
                                src={user.profileImageURL}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={5} />
                    <Grid item xs={4}>
                        <Button
                            style={{ height: '1rem', width: "2rem", fontSize: "8pt" }}
                            variant="contained"
                            color="primary"
                            onClick={handlerImageUpload}
                        >
                            Edit
                        </Button>
                    </Grid>

                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">{user.firstName}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6"> {user.lastName}</Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant="body1">{user.email}</Typography>
                </Grid>

                <Grid item container xs={12}>
                    <Grid item xs={8}>
                        <Typography variant="body2">Role: {user.role}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        {user.role === 'UNVERIFIED' && (
                            <Button
                                style={{ height: '1rem', width: "2rem", fontSize: "8pt" }}
                                variant="contained"
                                color="primary"
                                onClick={handleOpenVerifyDialog}
                            // size="small"
                            >
                                Verify
                            </Button>
                        )}
                    </Grid>


                </Grid>
                <Grid item xs={12}>
                    <label>Member since: </label>
                    <Typography variant="body2">{showFormattedDate(user.dateJoined)}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">Status: {user.active ? 'Active' : 'Inactive'}</Typography>
                </Grid>



            </Grid>
        </Paper >
    );

    // Generate list items for view history
    const viewHistoryList = (
        <List>
            {history.map((historyItem, index) => (
                <Paper key={index} elevation={2} sx={{ margin: 1 }}>
                    <ListItem>
                        <ListItemText
                            primary={historyItem.postId}
                            secondary={showFormattedDate(historyItem.viewDate)}
                        />
                    </ListItem>
                </Paper>
            ))}
        </List>
    );

    return (

        <Grid sx={{ paddingTop: "3rem" }} container spacing={2}>

            <Grid item xs={6}>
                <Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {userInfoItems}
                        </Grid>
                        <Grid item xs={12}>
                            <Dialog open={openFileUpload} onClose={onCloseFileUpload}>
                                <DialogTitle>Upload File or Link</DialogTitle>
                                <DialogContent>
                                    <input
                                        accept="*/*" // You can restrict file types by changing this string
                                        id="file-upload"
                                        type="file"
                                        onChange={handleFileChange}
                                        style={{ display: 'block', marginBottom: '20px' }}
                                    />
                                    <TextField
                                        label="Or enter a link"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={link}
                                        onChange={handleLinkChange}
                                        disabled={!!file} // Disable if a file is selected
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={onCloseFileUpload}
                                    >Cancel</Button>
                                    <Button
                                        onClick={handleUploadImageToBackend}
                                        color="primary"
                                    >Upload
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </Grid>

                        <Grid item xs={12}>
                            <Dialog open={openVerifyDialog} onClose={handleCloseVerifyDialog}>
                                <DialogTitle>Verify User</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please enter the verification code you received.
                                    </DialogContentText>
                                    <TextField
                                        name="verifyCode"
                                        autoFocus
                                        margin="dense"
                                        id="verificationCode"
                                        label="Verification Code"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={verifyCode}
                                        onChange={handlerVerifyCodeChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseVerifyDialog}>Cancel</Button>
                                    <Button onClick={handleVerify}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={4} />
                            <Grid item xs={4}>
                                <Button
                                    variant="outlined"
                                    onClick={handleOpenEditModal}
                                >Edit Profile</Button>
                            </Grid>

                        </Grid>
                        <EditUserProfile
                            open={isEditModalOpen}
                            onClose={handleCloseEditModal}
                            user={user}
                            onSave={handleSaveUser}
                        />
                    </Grid>
                </Grid>
            </Grid >


            <Grid item xs={6}>
                {viewHistoryList}
            </Grid>


        </Grid >
    );
}