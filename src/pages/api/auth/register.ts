import { NextApiRequest, NextApiResponse } from 'next';
import database from '@/database/index';
import User from '@/database/models/User';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const { name, userName, password, active } = req.body;
    
    if (!name || !userName || !password) {
      return res.status(400).json({ error: 'Name, username, and password are required' });
    }
    
    await database.connect();
    
    try {
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await User.create({
        name,
        userName,
        password: hashedPassword,
        active: !!active // Convert active to boolean
      });
      
      res.status(201).json({ message: 'User created successfully', user: newUser.userName });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } finally {
      await database.disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
