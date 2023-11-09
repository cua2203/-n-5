import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { MailDataRequired } from '@sendgrid/mail';
import sgMail from '@sendgrid/mail';

@injectable()

export class SendMail {

    sendMail(req: Request, res: Response) {
        sgMail.setApiKey("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");
        const msg = {
            to: 'phamcua670@gmail.com', // Change to your recipient
            from: 'pcua0064@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }

        sgMail
            .send(msg)
            .then(() => {
                res.json({message:'Email sent'});
            })
            .catch((error) => {
                res.json({error:error});
            })
    }
}






