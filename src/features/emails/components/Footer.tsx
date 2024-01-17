import { Link, Section } from '@react-email/components';

import { env } from '@/env.mjs';

const Footer = () => {
  return (
    <Section>
      <Link href={env.NEXT_PUBLIC_BASE_URL}>CrimPlex</Link>
      <br />
      Climbing has never been so easy
    </Section>
  );
};

export default Footer;
