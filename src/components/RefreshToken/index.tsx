import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../../apiConfig';
import { CircularProgress } from '@mui/material';
import Home from '../Home';

export default function RefreshToken(props: {setSelectedComponent?: React.Dispatch<React.SetStateAction<JSX.Element>>}) {
  const navigate = useNavigate();
  const {setSelectedComponent} = props;

  useEffect(() => {
    fetch(API.refreshToken)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("token", data.data);
        if(setSelectedComponent) {
            setSelectedComponent(<Home />);
        }
        navigate("/dashboard");
      })
      .catch(error => {
        console.error("Error fetching token: ", error);
      });
  }, []);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  )
}

