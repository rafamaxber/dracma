import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailService {
  constructor(private readonly httpService: HttpService) {}

  async execute({ from, to, subject, text }) {
    console.log('SendEmailService:: ', from);

    const response = this.httpService.post(
      `https://www.mailinator.com/api/v2/domains/public/webhook/${process.env.MAILINATOR_TOKEN}/`,
      {
        from,
        subject,
        text: String(text),
        to,
        msgType: 'text',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.subscribe(() => {
      console.log('email enviado com sucesso:: ');
    });
  }
}
