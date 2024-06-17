import { NextApiRequest, NextApiResponse } from 'next';
import database from '@/database/index';
import User from '@/database/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserType from "@/database/models/UserType";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const { userNameOrEmail, password } = req.body; // Accept userNameOrEmail instead of userName
    
    if (!userNameOrEmail || !password) {
      return res.status(400).json({ error: 'Username or email and password are required' });
    }
    
    await database.connect();
    
    try {
      // Check if user exists by userName or email
      const user = await User.findOne({ $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }] });
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid username, email, or password' });
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username, email, or password' });
      }
      
      const userType = await UserType.findById(user.userTypeId);
      const userTypeName = userType ? userType.name : 'Unknown'; // Handle case when userType is not found
      
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      
      res.status(200).json({ message: 'Login successful', token, 'user': user.email, 'userType': userTypeName });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred', error: err });
    } finally {
      await database.disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
