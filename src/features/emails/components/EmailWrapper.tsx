import { ReactNode } from 'react';

import { Body, Head, Html, Preview, Tailwind } from '@react-email/components';

interface EmailWrapperProps {
  preview: string;
  children: ReactNode;
}
const EmailWrapper = ({ preview, children }: EmailWrapperProps) => {
  return (
    <Html>
      <Tailwind>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
        <Preview>{preview}</Preview>
        <Body>{children}</Body>
      </Tailwind>
    </Html>
  );
};

export default EmailWrapper;
