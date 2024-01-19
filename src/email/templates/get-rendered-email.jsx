import { render } from '@react-email/render';
import { emailTemplateConstants } from './template-constants';
import { Logger } from '@nestjs/common';

const templates = {
  [emailTemplateConstants.welcome]: () =>
    import('./login').then((module) => module.WelcomeTemplate),
  [emailTemplateConstants.resetPassword]: () =>
    import('./forgot-password').then((module) => module.ForgotPasswordTemplate),
};

export async function getRenderedEmail(templateId, data = {}) {
  try {
    const TemplateComponent = await templates[templateId]();

    return {
      react: <TemplateComponent {...data} />,
      html: render(<TemplateComponent {...data} />),
      text: render(<TemplateComponent {...data} />, {
        plainText: true,
      }),
    };
  } catch (error) {
    Logger.error(`Error:getRenderedEmail: [templateId: ${templateId}}]`, error);
    throw error;
  }
}
