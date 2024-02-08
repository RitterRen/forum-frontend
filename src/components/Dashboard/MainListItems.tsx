import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Home from '../Home';
import Contact from '../Contact';
import { UserProfile } from '../UserDetail';
import PostDetail from '../PostDetail';

export default function MainListItems(props: {setSelectedComponent: React.Dispatch<React.SetStateAction<JSX.Element>>}) {
    const navigate = useNavigate();
    const { setSelectedComponent } = props;

    return (
        <React.Fragment>
          <ListItemButton onClick={() => setSelectedComponent(<Home/>)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton onClick={() => setSelectedComponent(<UserProfile />)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User Profile" />
          </ListItemButton>

          <ListItemButton onClick={() => setSelectedComponent(<PostDetail />)}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Post Detail" />
          </ListItemButton>

          <ListItemButton onClick={() => setSelectedComponent(<Contact/>)}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItemButton>
        </React.Fragment>
      );
}
