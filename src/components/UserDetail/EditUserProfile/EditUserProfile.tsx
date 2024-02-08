import React, { useState, ChangeEvent } from 'react';
import { Grid, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { UserModel } from '../../../types';

interface EditUserProfileProps {
    open: boolean;
    onClose: () => void;
    user: UserModel;
    onSave: (user: UserModel) => void;
}

// const token = localStorage.getItem("token")

export const EditUserProfile: React.FC<EditUserProfileProps> = ({ open, onClose, user, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedUser(prevState => ({ ...prevState, [name]: value }));
    };
    const handleSave = () => {
        onSave(editedUser);
        onClose(); // Close modal after saving
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleChange}
                    placeholder={user.firstName}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleChange}
                    placeholder={user.lastName}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    placeholder={user.email}
                />
                {/* Add more fields as needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
