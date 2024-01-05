import { sendEmail } from '@/libs/mailer';
import { render } from '@react-email/render';
import { VerifyEmail } from '../../emails/emails/verify-email';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
const supportLink = `${baseUrl}/support`;

export async function sendVerifyEmail(username: string, email: string, token: string) {

  const subject = "Verify your email";
  const verifyLink = `${baseUrl}/auth/verify?token=${token}`;

  const emailHtml = render(<VerifyEmail username={username} verifyLink={verifyLink} supportLink={supportLink} />, { pretty: true });
  const emailText = render(<VerifyEmail username={username} verifyLink={verifyLink} supportLink={supportLink} />, { pretty: true, plainText: true });

  const info = await sendEmail({
    to: email,
    subject,
    text: emailText,
    html: emailHtml,
  });

  console.log("Verify email sent: %s", info.messageId);
}