import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainListItems from './MainListItems';
import SignIn from '../SignIn';
import Home from '../Home';
import Contact from '../Contact';
import { useState } from 'react';
import SignUp from '../SignUp';
import AdminListItems from './AdminListItems';
import useAuthorization from '../hooks/useAuthorization';
import Copyright from '../Copyright';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function Dashboard() {
    const [open, setOpen] = useState<boolean>(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element>(<SignIn />);
    const { isAuthorized, role } = useAuthorization();

    const headers = isAuthorized ? [{ label: `Current Role: ${role}`, component: <></> }, { label: "Log Out", component: <></> }] : [
        { label: "Log In", component: <SignIn setSelectedComponent={setSelectedComponent}/> },
        { label: "Register", component: <SignUp /> },
    ]

    const getHeaderButtons = () => {
        return isAuthorized ? (
            <>
                <Button
            sx={{
                color: 'white',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // 使用 Material-UI 默认字体，您可以根据需要更改
                fontWeight: 'bold', // 设置字体加粗
                fontSize: '1rem', // 设置字体大小
                textTransform: 'none', // 取消大写字母转换
                // 可以根据需要添加更多样式
            }}
            >
              Current Role: ${role}
            </Button>
            <Button
            onClick={() => {
                localStorage.removeItem('token');
                // 重定向到登录页面
                window.location.href = '/signIn';
            }}
            sx={{
                color: 'white',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // 使用 Material-UI 默认字体，您可以根据需要更改
                fontWeight: 'bold', // 设置字体加粗
                fontSize: '1rem', // 设置字体大小
                textTransform: 'none', // 取消大写字母转换
                // 可以根据需要添加更多样式
            }}
            >
                Log Out
            </Button>
            </>
            
        ) :
        headers.map(({ label, component }) => {
            return (
                <Button
                    onClick={() => setSelectedComponent(component)}
                    sx={{
                        color: 'white',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // 使用 Material-UI 默认字体，您可以根据需要更改
                        fontWeight: 'bold', // 设置字体加粗
                        fontSize: '1rem', // 设置字体大小
                        textTransform: 'none', // 取消大写字母转换
                        // 可以根据需要添加更多样式
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{
                            flexGrow: 1, 
                            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', 
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                        }}
                    >
                        Forum Web App
                    </Typography>
                    <div style={{ paddingRight: "15px" }}>
                        {getHeaderButtons()}
                    </div>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <MainListItems setSelectedComponent={setSelectedComponent} />
                    <Divider sx={{ my: 1 }} />
                    <AdminListItems setSelectedComponent={setSelectedComponent} />
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container>
                        <Grid item xs={12}>
                            {selectedComponent}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
