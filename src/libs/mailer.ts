'use server';
import { createTransport } from "nodemailer";

type EmailPayload = {
  to: string
  subject: string
  text: string
  html: string
}

const fromEmail = process.env.SMTP_SENDER
const smtpOptions = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}

export const sendEmail = async (data: EmailPayload) => {
  const transporter = createTransport({
    ...smtpOptions,
  })
  return await transporter.sendMail({
    from: fromEmail,
    ...data,
  })
}