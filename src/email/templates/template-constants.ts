export const emailTemplateConstants = {
  resetPassword: 'reset-password',
  welcome: 'welcome',
} as const;

export const emailTemplateConfig = {
  [emailTemplateConstants.welcome]: {
    subject: 'Dracma - Bem vindo!',
    template: 'sign-in',
    from: 'suporte@dracma.app.br',
    tags: ['welcome'],
  },

  [emailTemplateConstants.resetPassword]: {
    subject: 'Reset password',
    template: 'reset-password',
    from: 'suporte@dracma.app.br',
    tags: ['reset-password'],
  },
} as const;
