import { sendEmail } from '@/libs/mailer';
// import { render } from '@react-email/render';
// import { VerifyEmail } from '../emails/verify-email';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
const supportLink = `${baseUrl}/support`;

export async function sendVerifyEmail(username: string, email: string, token: string) {

  const subject = "Verify your email";
  const verifyLink = `${baseUrl}/auth/verify?token=${token}`;

  // const emailHtml = render(<VerifyEmail username={username} verifyLink={verifyLink} supportLink={supportLink} />, { pretty: true });
  // const emailText = render(<VerifyEmail username={username} verifyLink={verifyLink} supportLink={supportLink} />, { pretty: true, plainText: true });

  const info = await sendEmail({
    to: email,
    subject,
    // text: emailText,
    // html: emailHtml,
    text: 'Please verify your email address with the following link: ' + verifyLink,
    html: 'Please verify your email address with the following link: <a target="_blank" href="' + verifyLink + '">' + verifyLink + '</a>',
  });

  console.log("Verify email sent: %s", info.messageId);
}