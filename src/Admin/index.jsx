import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import { useUser } from '@clerk/clerk-react';
import AdminProducts from './../Admin/components/AdminProducts';
import CategoryAdminPanel from './../Admin/components/AdminUpdatePrice';
import Footer from '@/components/Footer';
import { FaUsers, FaSeedling, FaChartLine, FaEnvelope } from "react-icons/fa";
import { db } from './../../configs';
import { contactMessages } from './../../configs/schema';
import { desc } from 'drizzle-orm';
import { Loader } from 'lucide-react';

export default function AdminPanel() {
  const [view, setView] = useState('users');
  const [activeUsers, setActiveUsers] = useState([]);
  const [contactMessagesList, setContactMessagesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    if (view === 'users') {
      fetchActiveUsers();
    } else if (view === 'contact') {
      fetchContactMessages();
    }
  }, [view]);

  const fetchActiveUsers = () => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/active-users')
      .then((response) => {
        const usersWithImages = response.data.map((u) => ({
          ...u,
          image: u.imageUrl || user?.imageUrl || 'https://via.placeholder.com/80',
        }));
        setActiveUsers(usersWithImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users', err);
        setLoading(false);
      });
  };

  const fetchContactMessages = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(contactMessages)
        .orderBy(desc(contactMessages.id));

      setContactMessagesList(result);
    } catch (err) {
      console.error('Failed to fetch contact messages', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setActiveUsers(activeUsers.filter((u) => u.id !== userId));
        alert(data.message);
      } else {
        alert(data.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user', err);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 shadow h-screen sticky top-0">
          <div className="mb-6 text-center">
            <img
              src={user?.imageUrl || '/profile.jpg'}
              alt="Admin"
              className="w-12 h-12 rounded-full mx-auto mb-2"
            />
            <p className="font-semibold">{user?.fullName || 'Admin'}</p>
          </div>
          <nav className="space-y-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setView('users');
              }}
              className={`flex items-center gap-2 py-2 px-4 rounded transition text-black 
                ${view === 'users' ? 'bg-blue-200 text-primary font-bold' : 'hover:bg-blue-100'}`}
            >
              <FaUsers className="text-lg" />
              <span>Users</span>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setView('products');
              }}
              className={`flex items-center gap-2 py-2 px-4 rounded transition text-black 
                ${view === 'products' ? 'bg-blue-200 text-primary font-bold' : 'hover:bg-blue-100'}`}
            >
              <FaSeedling className="text-lg" />
              <span>Products</span>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setView('price');
              }}
              className={`flex items-center gap-2 py-2 px-4 rounded transition text-black 
                ${view === 'price' ? 'bg-blue-200 text-primary font-bold' : 'hover:bg-blue-100'}`}
            >
              <FaChartLine className="text-lg" />
              <span>Crop Price</span>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setView('contact');
              }}
              className={`flex items-center gap-2 py-2 px-4 rounded transition text-black 
                ${view === 'contact' ? 'bg-blue-200 text-primary font-bold' : 'hover:bg-blue-100'}`}
            >
              <FaEnvelope className="text-lg" />
              <span>Contact Inbox</span>
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50">
          {view === 'users' && (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>

              {loading ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-48 bg-white rounded-lg shadow p-4 m-2 text-center animate-pulse"
                    >
                      <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto my-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto my-1"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mt-3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap">
                  {activeUsers.map((u) => (
                    <div
                      key={u.id}
                      className="w-48 bg-white rounded-lg shadow p-4 m-2 text-center hover:shadow-lg transition transform hover:scale-105"
                    >
                      <img
                        src={u.image}
                        alt={u.firstName}
                        className="w-20 h-20 rounded-full mx-auto"
                      />
                      <p className="font-semibold">
                        {u.firstName} {u.lastName}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {u.emailAddresses[0]?.emailAddress}
                      </p>
                      <button
                        className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {view === 'products' && <AdminProducts />}
          {view === 'price' && <CategoryAdminPanel />}

          {view === 'contact' && (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-center mb-6">📬 Contact Inbox</h1>

              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader className="animate-spin mr-2" /> Loading...
                </div>
              ) : contactMessagesList.length === 0 ? (
                <p className="text-center">No messages yet. 🎉</p>
              ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                  {contactMessagesList.map((msg) => (
                    <div
                      key={msg.id}
                      className="w-[300px] bg-gray-100 rounded-md shadow-sm hover:shadow-md transition cursor-pointer p-4"
                      onClick={() => setExpandedMessageId(msg.id)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={msg.userImageUrl || "https://via.placeholder.com/50"}
                          alt="User"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-lg">
                            {msg.firstName} {msg.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {msg.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Modal */}
              {expandedMessageId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
                    <button
                      onClick={() => setExpandedMessageId(null)}
                      className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                    >
                      &times;
                    </button>
                    {(() => {
                      const msg = contactMessagesList.find(m => m.id === expandedMessageId);
                      return (
                        <>
                          <h2 className="text-xl font-bold mb-2">
                            {msg.firstName} {msg.lastName}
                          </h2>
                          <p className="text-sm text-gray-500 mb-2">
                            {msg.email} | {msg.phone || "N/A"}
                          </p>
                          <div className="text-gray-800">
                            <strong>Message:</strong>
                            <p className="mt-1">{msg.message}</p>
                          </div>
                          <div className="text-xs text-gray-400 mt-4">
                            Sent on:{" "}
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleString()
                              : "Unknown"}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
