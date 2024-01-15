'use client';

import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();

  return <div>{String(params)}</div>;
};

export default Page;
