import React, { useState, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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


    const handleSave = async () => {
        onSave(editedUser);
        onClose(); // Close modal after saving
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
