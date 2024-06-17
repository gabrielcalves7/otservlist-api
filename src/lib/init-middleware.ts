import Cors from 'cors'; // Import the CORS middleware
import { NextApiRequest, NextApiResponse } from 'next';

export default function initMiddleware(middleware: (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void) {
  return (req: NextApiRequest, res: NextApiResponse) => new Promise<void>((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

