import { v4 } from 'uuid';

class TokenValidator {
  public async generate(): Promise<string> {
    try {
      const token: string = v4();
      return token;
    } catch (error: any) {
      return error;
    }
  }
}

export default new TokenValidator();
