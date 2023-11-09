import { Router } from 'express';
import { container } from 'tsyringe';
import {SendMail} from '../controllers/sendMail'



const MailRouter = Router();
const Mail = container.resolve(SendMail);

MailRouter.post('/send', Mail.sendMail.bind(Mail));

export default MailRouter;
