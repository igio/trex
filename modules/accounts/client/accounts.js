AccountsTemplates.configure({
  defaultLayout: 'trexLayout',
  showForgotPasswordLink: true
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/login',
  template: 'trexLogin',
  layoutTemplate: 'trexLayout'
});