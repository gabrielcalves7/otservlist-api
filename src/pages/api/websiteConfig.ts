// Import the required modules
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware';
import database from "@/database";
import WebsiteConfig from "@/database/models/WebsiteConfig"; // Adjust the path as needed

// Initialize the CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'], // Add other allowed methods if needed
    origin: '*',
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'GET') {
    await database.connect();
    
    try {
      // Fetch the website configuration from the database
      const config = await WebsiteConfig.findOne();
      
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
