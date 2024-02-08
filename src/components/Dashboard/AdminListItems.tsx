import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import React from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment';
import UserManagement from '../UserManagement';
import MessageManagement from '../MessageManagement';
import Home from '../Home';

export default function AdminListItems(props: {setSelectedComponent: React.Dispatch<React.SetStateAction<JSX.Element>>}) {
  const { setSelectedComponent } = props;
  
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Admin Pages
      </ListSubheader>

      <ListItemButton onClick={() => setSelectedComponent(<Home/>)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Home" />
      </ListItemButton>

      <ListItemButton onClick={() => setSelectedComponent(<UserManagement/>)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="User Management" />
      </ListItemButton>

      <ListItemButton onClick={() => setSelectedComponent(<MessageManagement/>)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItemButton>

    </React.Fragment>
  )
}
