import express from 'express'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const prismaFeedbacksRepository = new PrismaFeedbackRepository();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })
 
    // await transport.sendMail({
    //     from: 'Equipe Feedget <oi@feedget.com>',
    //     to: 'Thiago Monteiro <batata@gmail.com>',
    //     subject: 'Novo Feedback',
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    //         `<p>Tipo do Feedback: ${type}</p>`,
    //         `<p>Comentário: ${comment}</p>`
    //     ].join('\n')
    // })

    return res.status(201).send()
})