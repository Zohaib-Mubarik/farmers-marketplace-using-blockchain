import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClerkClient } from '@clerk/backend';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Initialize Clerk client
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// API Route: Fetch Active Users
app.get('/api/active-users', async (req, res) => {
  try {
    const users = await clerk.users.getUserList();
    const activeUsers = users.data.filter((user) => !user.publicMetadata?.blocked);
    res.status(200).json(activeUsers);
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({ error: 'Failed to fetch active users' });
  }



});

// API Route: Delete a User
app.delete('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    await clerk.users.deleteUser(userId);
    res.status(200).json({ message: `User ${userId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


// API Route: Get Total User Count
app.get('/api/user-count', async (req, res) => {
  try {
    const users = await clerk.users.getUserList();
    const totalUsers = users.data.length; // Get total number of users

    res.status(200).json({ count: totalUsers });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ error: 'Failed to fetch user count' });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});