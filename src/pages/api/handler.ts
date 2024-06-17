import { NextApiRequest, NextApiResponse } from 'next';
import database from '@/database/index';
import { createUser, updateUser, deleteUser } from '@/database/controllers/UserController';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await database.connect();
  
  try {
    switch (req.method) {
      case 'POST':
        // Create a new user
        const newUser = await createUser(req.body);
        res.status(201).json({ message: 'User created successfully', user: newUser });
        break;
      case 'PUT':
        // Update an existing user
        const updatedUser = await updateUser(req.body.id, req.body);
        if (updatedUser) {
          res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
        break;
      case 'DELETE':
        // Delete an existing user
        const deletedUser = await deleteUser(req.body.id);
        if (deletedUser) {
          res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
        break;
      default:
        res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await database.disconnect();
  }
}
