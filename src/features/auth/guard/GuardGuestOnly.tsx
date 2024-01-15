'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { ErrorPage } from '@/components/ErrorPage';
import { LoaderFull } from '@/components/LoaderFull';
import { trpc } from '@/lib/trpc/client';

export const GuardGuestOnly = ({ children }: { children: ReactNode }) => {
  const isAuth = trpc.auth.isAuth.useQuery();
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (isAuth.isSuccess && isAuth.data.status) {
      const redirect = searchParams?.get('redirect') || '/';
      router.replace(redirect);
    }
  }, [searchParams, router, isAuth.isSuccess, isAuth.data]);

  if (isAuth.isSuccess && !isAuth.data?.status) {
    return <>{children}</>;
  }

  if (isAuth.isError) {
    return <ErrorPage />;
  }

  return <LoaderFull />;
};
