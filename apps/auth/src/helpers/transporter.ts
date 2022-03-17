import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import ENV from '../config/env';


export class MailHelper {
  constructor(to: string, subject: string, text: string, from?: string, template?: string, context?: any) {
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.from = from ? from : '';
    this.template = template ? template : '';
    this.context = context;
  }
  private to: string;
  private subject: string;
  private text: string;
  private from: string;
  private template: string;
  private context: any;

  private getHandleBarsOptions = {
    viewEngine: {
      extName: '.hbs',
      layoutsDir: 'apps/auth/views/layouts',
      partialsDir: 'apps/auth/views/partials',
      defaultLayout: 'main.hbs',
    },
    viewPath: 'apps/auth/views/',
    extName: '.hbs',
  };

  public async sendMailWithTemplate(): Promise<any> {
    try {
      const options: any = {
        from: this.from ? this.from : ENV.EMAIL_USER,
        to: this.to,
        subject: this.subject,
        layout: 'main',
        text: this.text,
        template: this.template,
        context: { ...this.context },
      }
      this.transporter.use('compile', hbs(this.getHandleBarsOptions));
      return await this.transporter.sendMail(options);
    } catch (error) {
      return error;
    }
  }

  public async sendMail(): Promise<any> {
    try {
      return await this.transporter.sendMail({
        from: this.from ? `Admin-pro <${this.from}>` : `Admin-pro <${ENV.EMAIL_USER}>`,
        to: this.to,
        subject: this.subject,
        text: this.text,
      });
    } catch (error) {
      return error;
    }
  }

  private transporter = createTransport({
    host: ENV.EMAIL_HOST,
    port: ENV.EMAIL_PORT,
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS,
    }
  });
}
