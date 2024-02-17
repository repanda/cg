import { LogoutOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';

type Props = {
  setIsAuthenticated: (isAuthenticated: boolean) => boolean;
};

const Logout = (props: Props) => {
  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 300,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', false);
            props.setIsAuthenticated(false);
          },
        });
      }
    });
  };

  return (
      <IconButton color="inherit" onClick={handleLogout} title='Logout'>
        <LogoutOutlined/>
      </IconButton>
  );
};

export default Logout;