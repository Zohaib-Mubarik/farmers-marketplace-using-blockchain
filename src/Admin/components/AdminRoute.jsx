import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ADMIN_EMAIL = 'thefarmexofficial@gmail.com'; // Define the admin email

function AdminRoute({ children }) {
  // Get the authenticated user
  const { user } = useUser();

  // Check if the user is an admin
  const isAdmin = user?.emailAddresses?.some(
    (email) => email.emailAddress === ADMIN_EMAIL
  );

  // If the user is not an admin, redirect to the home page
  if (!isAdmin) {
    return <Navigate to="" />;
  }

  // If the user is an admin, render the children (admin-only content)
  return children;
}

export default AdminRoute;