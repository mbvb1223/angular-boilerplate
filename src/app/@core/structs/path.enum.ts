export enum Path {
  // General containers
  Public = 'public',
  Home = '',
  NotFound = '404',

  // Auth
  Auth = '',
  SignIn = 'auth/dang-nhap',
  SignUp = 'sign-up',
  ForgotPassword = 'forgot-password',
  ForgotPasswordEmailSent = 'forgot-password-email-sent',
  PasswordReset = 'password-reset',
  PasswordResetFailed = 'password-reset-failed',
  PasswordResetSucceeded = 'password-reset-succeeded',

  // App base url
  App = 'app',

  // Settings
  Settings = 'settings',
  SettingsAccount = 'account',
  SettingsAppearance = 'appearance',
  SettingsBilling = 'billing',
  SettingsBlockedUsers = 'blocked-users',
  SettingsNotifications = 'notifications',
  SettingsSecurity = 'security',
  SettingsSecurityLog = 'security-log',

  // User
  User = 'users',
  UserOverview = 'overview',
  UserProfile = ':username',

  // Features
  Dashboard = 'dashboard',
  Contest = 'ky-thi',
  Subject = ':ky-thi/mon-thi',
  Section = ':ky-thi/mon-thi/:mon-thi/phan-thi',
  Post = 'bai-viet/:type',
}
