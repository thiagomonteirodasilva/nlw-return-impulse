import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4b25e86cad49b1",
      pass: "d801010b7c0252"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Thiago Monteiro <batata@gmail.com>',
        subject: subject,
        html: body
    })
    }
}