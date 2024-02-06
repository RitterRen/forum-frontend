import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../../apiConfig';
import { CircularProgress } from '@mui/material';

export default function RefreshToken() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API.refreshToken)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("token", data.data);
        navigate("/home");
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

