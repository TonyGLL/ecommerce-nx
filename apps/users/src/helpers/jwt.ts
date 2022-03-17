import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import handler from '../handlers/request.handler';
import ENV from '../config/env';

interface verifyData {
  token: string | string[] | undefined;
  secret: string | undefined;
}

class JSONWebToken {
  public signJWT(data: any) {
    const token: string = jwt.sign({
      ...data,
    }, ENV.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });
    return token;
  }

  public async verifyToken(req: Request, res: Response): Promise<any> {
    try {
      const token: verifyData['token'] = (req.headers.authorization) ? (req.headers.authorization).replace('Bearer ', '') : undefined;
      if (token && ENV.JWT_SECRET) {
        const isValid: boolean = JSONWebToken.verifyJWT({ token, secret: ENV.JWT_SECRET });
        if (isValid) return true;
      }
      return false;
    } catch (err: any) {
      handler(res, err.message, { error: 'Unnauthorized' });
    }
  }

  private static verifyJWT(verifyData: verifyData): boolean {
    try {
      verify(String(verifyData.token), String(verifyData.secret));
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new JSONWebToken();
