import { ReactNode } from 'react';

import { Body, Head, Html, Preview, Tailwind } from '@react-email/components';

interface EmailWrapperProps {
  preview: string;
  children: ReactNode;
}
const EmailWrapper = ({ preview, children }: EmailWrapperProps) => {
  return (
    <Tailwind>
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width" />
        </Head>
        <Preview>{preview}</Preview>
        <Body>{children}</Body>
      </Html>
    </Tailwind>
  );
};

export default EmailWrapper;
