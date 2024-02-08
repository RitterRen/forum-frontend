import React, { useEffect, useState } from 'react'
import API from '../../apiConfig'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function UserManagement() {

  const [users, setUsers] = useState<User[]>([]);

  const fetchData = async () => {
    const response = await fetch(API.getAllUsers, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const jsonData: ApiResponse = await response.json();
    if (jsonData.code === "0000" && jsonData.info === "Success") {
      setUsers(jsonData.data as User[]);
    }
  };

  const updateStatus = async (userId: number) => {
    const toggleUserStatus = API.toggleUserStatus.replace(/\{userId\}/g, userId.toString());
    
    const response = await fetch(toggleUserStatus, {
      method: 'PATCH', 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const jsonData: ApiResponse = await response.json();
    if (jsonData.code === "0000" && jsonData.info === "Success") {
      fetchData(); // 重新获取所有用户数据
    } else {
      console.error(jsonData);
      window.alert('Failed to update user status.'); // 提示失败
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  

  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <h2>User Management Page</h2>
      <TableContainer component={Paper} sx={{ maxWidth: 1200 }}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date Joined</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.userId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dateJoined}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.active ? 'Active' : 'Banned'}</TableCell>
                <TableCell>
                  {user.role !== 'ADMIN' && (
                    <Button
                      variant="contained"
                      color={user.active ? 'secondary' : 'primary'}
                      onClick={() => updateStatus(user.userId)}
                      sx={{
                        width: 100, // 设置固定宽度
                        height: 40, // 设置固定高度
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textTransform: 'none', // 如果不希望字母全部大写可以加上这个
                        fontSize: '0.875rem', // 根据需要调整字体大小
                      }}
                    >
                      {user.active ? 'BAN' : 'ACTIVATE'}
                    </Button>
                  )}
                  {user.role === "ADMIN" && (
                    <Button
                    variant="contained"
                    disabled={true} // 使按钮不可用
                    sx={{
                      width: 100, // 设置固定宽度
                      height: 40, // 设置固定高度
                      backgroundColor: 'grey', // 设置按钮为灰色
                      '&:disabled': {
                        backgroundColor: 'grey', // 确保即使按钮不可用也显示灰色
                        color: 'white', // 设置不可用按钮的文字颜色
                      },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textTransform: 'none', // 如果不希望字母全部大写可以加上这个
                      fontSize: '0.875rem', // 根据需要调整字体大小
                    }}
                  >
                    Admin
                  </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export interface User {
    userId: number;
    email: string;
    password: null | string;
    firstName: string;
    lastName: string;
    active: boolean;
    dateJoined: string;
    role: string;
    profileImageURL: null | string;
}

export interface ApiResponse {
    code: string;
    info: string;
    data: User[];
}

// Testing token
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NyIsInBlcm1pc3Npb25zIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJleHAiOjE3MDgyMTU5MjMsImlhdCI6MTcwNzM1MTkyM30.oQZORdWUgfh-Avlep_RV6jHTMqoo1MhHraPf09cD5eQ"
