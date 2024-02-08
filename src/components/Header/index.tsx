import React from 'react'
import { Toolbar, AppBar, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link as RouterLink } from 'react-router-dom'

export default function Header() {
  const { logo, menuButton, toolbar, appbar, header } = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  }

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Forum Web App
    </Typography>
  )

  const getMenuButtons = () => {
    return headerList.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };


  return (
    <header className={header}>
      <AppBar className={appbar}>{displayDesktop()}</AppBar>
    </header>
  )
}

const headerList = [
  {
    label: "Register",
    href: "/signUp",
  },
  {
    label: "Log In",
    href: "/signIn",
  },
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
  {
    label: "Profile",
    href: "/user",
  },
]

const useStyles = makeStyles(() => ({
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  appbar: {
    paddingRight: "60px",
    paddingLeft: "20px",
  },
  header: {
    paddingBottom: "40px",
  }
}));