import jwt, { JwtPayload } from 'jsonwebtoken';
import * as e from 'express';
import * as dotenv from 'dotenv';
import { IReq, IRes } from '../Types/express';

dotenv.config();


interface TokenPayload extends JwtPayload {
  user: string;
  role: string;
  status: string;
  works_at: string
}

function generateToken(user: string, role: string, 
  status: string, works_at: string): string 
{
  const secretKey = process.env.JWT_SECRET as string; 

  const payload: TokenPayload = {
    user, role, status, works_at
  };

  const options: jwt.SignOptions = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
}

function verifyUser(req: IReq, res: IRes, next: e.NextFunction): void {
  try {
    const secretKey = process.env.JWT_SECRET as string; 
    const authHeader = req.headers.authorization;
   

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Bearer token not found in headers
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, secretKey) as TokenPayload;
    req.user = decodedToken;
    next();
    
  } catch (error) {
    // Token verification failed
    res.status(401).json({ message: 'Unauthorized' });
  }
}

function verifyTokenAndCheckAdmin(req: IReq, res: IRes, next: e.NextFunction): void {
  try {
    const secretKey = process.env.JWT_SECRET as string;
    let token = req.headers.authorization;

    if (!token) {
      // Token not found in headers
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7); // Remove 'Bearer ' prefix to get the token
    }

    const decodedToken = jwt.verify(token, secretKey) as TokenPayload;

    if (decodedToken.role === 'admin') {
      // User role is admin
      next();
    } else {
      // User role is not admin
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    // Token verification failed
    res.status(401).json({ message: 'Unauthorized' });
  }
}


export default{
  generateToken,
  verifyUser,
  verifyTokenAndCheckAdmin
} as const;