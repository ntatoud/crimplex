/* eslint-disable @next/next/no-head-element */
import { ReactNode } from 'react';

import { Body, Html, Preview, Tailwind } from '@react-email/components';

interface EmailWrapperProps {
  preview: string;
  children: ReactNode;
}
const EmailWrapper = ({ preview, children }: EmailWrapperProps) => {
  return (
    <Html>
      <Tailwind>
        <head>
          <meta name="viewport" content="width=device-width" />
        </head>
        <Preview>{preview}</Preview>
        <Body>{children}</Body>
      </Tailwind>
    </Html>
  );
};

export default EmailWrapper;
