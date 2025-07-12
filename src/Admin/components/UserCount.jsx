import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserCount = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user-count')
      .then((response) => {
        setUserCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching user count:', error);
      });
  }, []);

  return (
    <div
      style={{
        width: '250px',
        padding: '30px',
        backgroundColor: '#1E1E2D',
        color: 'white',
        textAlign: 'center',
        borderRadius: '12px',
        fontSize: '22px',
        fontWeight: 'bold',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-in-out',
        margin: '5px ',
        border: '1px solid #3A3B5A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Link
        to="/active-users"
        style={{
          width: '100%',
          height: '100%',
          textDecoration: 'none', // Remove underline from the link
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer', // Ensures only the content inside is clickable
        }}
        onMouseOver={(e) => {
          e.currentTarget.parentElement.style.backgroundColor = '#27293D';
          e.currentTarget.parentElement.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.parentElement.style.backgroundColor = '#1E1E2D';
          e.currentTarget.parentElement.style.transform = 'scale(1)';
        }}
      >
        <FaUsers style={{ fontSize: '40px', marginBottom: '10px', color: '#F8F9FA' }} />
        <div style={{ fontSize: '32px', color: '#F8F9FA' }}>{userCount}</div>
        <div style={{ fontSize: '18px', color: '#F8F9FA', marginTop: '5px' }}>Total Users</div>
      </Link>
    </div>
  );
};

export default UserCount;