import { sendEmail } from '@/libs/mailer';

export async function sendVerifyEmail(email: string, token: string) {
  const info = await sendEmail({
    to: email,
    subject: "Verify your email",
    text: "",
    html: "Your verification token is: " + token,
  });

  console.log("Message sent: %s", info.messageId);
}