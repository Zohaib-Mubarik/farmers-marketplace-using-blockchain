import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashBoardProduct = () => {
  return (
    <Link to={'/admin-products'}>
      <div 
        style={{
            width: '250px',
            padding: '57px',
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
        <div
          style={{
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
          <FaBoxOpen className='size-10' />
          {/* <div style={{ fontSize: '32px', color: '#F8F9FA' }}>{productCount}</div> */}
          <div style={{ fontSize: '18px', color: '#F8F9FA', marginBottom: '8px' }}>Total Products</div>
        </div>
      </div>
    </Link>
  );
};

export default DashBoardProduct;