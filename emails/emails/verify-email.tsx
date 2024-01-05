import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerifyEmailProps {
  username: string;
  verifyLink: string;
  supportLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const VerifyEmail = ({
  username = 'username',
  verifyLink = '',
  supportLink = '',
}: VerifyEmailProps) => (
  <Html>
    <Head />
    <Preview>
      A fine-grained personal access token has been added to your account
    </Preview>
    <Body style={main}>
      <Container style={container}>

        <Section style={logo}>
          <Img
            src={`${baseUrl}/wault-logo-black.png`}
            width="60"
            height="60"
            alt="Wault"
          />
        </Section>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{username}</strong>!
          </Text>
          <Text style={text}>
            An account has been created in Wault. Please verify your email address by clicking the button below to activate your account.
          </Text>

          <Button style={button} href={verifyLink}>Verify your email</Button>
        </Section>
        <Text style={links}>
          <Link style={link} href={supportLink}>Contact support</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerifyEmail;

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '24px',
};

const title = {
  fontSize: '24px',
  lineHeight: 1.25,
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center' as const,
};

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
};

const button = {
  fontSize: '14px',
  backgroundColor: '#0366d6',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '0.75em 1.5em',
};

const links = {
  textAlign: 'center' as const,
};

const link = {
  color: '#0366d6',
  fontSize: '12px',
};
