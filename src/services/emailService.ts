// Mock email service

const mockSendEmail = async (to: string, subject: string, body: string) => {
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Email sent successfully');
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const subject = 'Welcome to RealEstate Comp';
  const body = `Hello ${name},\n\nWelcome to RealEstate Comp! We're excited to have you on board.\n\nBest regards,\nThe RealEstate Comp Team`;
  
  try {
    await mockSendEmail(email, subject, body);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  const subject = 'Password Reset Request';
  const body = 'You have requested to reset your password. Please follow the link below to reset your password:\n\n[PASSWORD_RESET_LINK]';
  
  try {
    await mockSendEmail(email, subject, body);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};