// Import the required modules
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware';
import database from "@/database";
import { getAll } from "@/database/controllers/OTServerController";

// Initialize the CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'], // Add other allowed methods if needed
    origin: '*',
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res); // Apply CORS headers
  
  if (req.method === 'GET') {
    await database.connect();
    
    try {
      const { page, amount } = req.query;
      
      const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
      const itemsNumber = typeof amount === 'string' ? parseInt(amount, 10) : 50;
      // Fetch the website configuration from the database
      const config = await getAll(pageNumber,itemsNumber);
      
      if (config) {
        res.status(200).json(config);
      } else {
      }
      await database.disconnect();
      
    } catch (error) {
      console.error('Error fetching website configuration:', error);
      
      res.status(500).json({ message: 'Internal server error' });
      await database.disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  // Your API route logic here
}
