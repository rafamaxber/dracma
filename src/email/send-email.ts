import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getRenderedEmail } from './templates/get-rendered-email.js';
import { emailTemplateConfig } from './templates/template-constants.js';

interface SendEmailServiceParams {
  to: string;
  template: string;
  data: Record<string, unknown>;
  from?: string;
  subject?: string;
}

@Injectable()
export class SendEmailService {
  private readonly emailProvider = new Resend(process.env.RESEND_EMAIL_TOKEN);

  async execute({ from, to, subject, template, data }: SendEmailServiceParams) {
    const { text, html } = await getRenderedEmail(template, data);
    const config = emailTemplateConfig[template];

    if (process.env.NODE_ENV === 'development') {
      console.log('SendEmailService:: ', {
        from,
        to,
        subject,
        template,
        data,
        ...config,
      });

      return;
    }

    this.emailProvider.emails.send({
      to: [to],
      html,
      text,
      subject: subject || config.subject,
      from: from || config.from,
      tags: config.tags,
    });

    return true;
  }
}
