import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCount from './UserCount';
import Header from '@/components/Header';

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch active users from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/active-users')
      .then((response) => {
        setActiveUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching active users:', error);
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json(); // Parse response JSON

      if (response.ok) {
        setActiveUsers(activeUsers.filter((user) => user.id !== userId));
        alert(data.message);
      } else {
        alert(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading active users...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Active Users</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-sm rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left border-b">Email</th>
                <th className="py-3 px-6 text-left border-b">First Name</th>
                <th className="py-3 px-6 text-left border-b">Last Name</th>
                <th className="py-3 px-6 text-center border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.map((user, index) => (
                <tr key={user.id} className={`border-b ${index% 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="py-3 px-6">{user.emailAddresses[0]?.emailAddress}</td>
                  <td className="py-3 px-6">{user.firstName}</td>
                  <td className="py-3 px-6">{user.lastName}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;