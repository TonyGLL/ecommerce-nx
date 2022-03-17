import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`) });

export default class ENV {
  public static PORT: string = process.env.PORT as string;
  public static HOST: string = process.env.host as string;
  public static USER: string = process.env.user as string;
  public static PASSWORD: string = process.env.password as string;
  public static DATABASE: string = process.env.database as string;
  public static JWT_SECRET: string = process.env.JWT_SECRET as string;
  public static EMAIL_USER: string = process.env.EMAIL_USER as string;
  public static EMAIL_PASS: string = process.env.EMAIL_PASS as string;
  public static EMAIL_HOST: string = process.env.EMAIL_HOST as string;
  public static EMAIL_PORT = Number(process.env.EMAIL_PORT);
  public static URL: string = process.env.URL as string;
  public static URL_FB: string = process.env.URL_FB as string;
  public static URL_INSTAGRAM: string = process.env.URL_INSTAGRAM as string;
  public static URL_TWITTER: string = process.env.URL_TWITTER as string;
  public static URL_WHATSAPP: string = process.env.URL_WHATSAPP as string;
  public static GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID as string;
  public static GOOGLE_SECRET_ID: string = process.env.GOOGLE_SECRET_ID as string;
}
