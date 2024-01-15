'use client';

import { ReactNode, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { ErrorPage } from '@/components/ErrorPage';
import { LoaderFull } from '@/components/LoaderFull';
import { trpc } from '@/lib/trpc/client';

export const GuardAdmin = ({ children }: { children: ReactNode }) => {
  const isAuth = trpc.auth.isAuth.useQuery();

  const pathname = usePathname();
  const router = useRouter();

  // Redirect to login
  useEffect(() => {
    if (isAuth.isSuccess && !isAuth.data.status) {
      router.replace(`/admin/login?redirect=${pathname || '/'}`);
    }
  }, [pathname, router, isAuth.isSuccess, isAuth.data]);

  if (
    isAuth.isSuccess &&
    isAuth.data?.status &&
    !isAuth.data.authorizations?.includes('admin')
  ) {
    console.log('yes');
    return <ErrorPage errorCode={403} />;
  }

  if (isAuth.data?.status && isAuth.data?.authorizations?.includes('admin')) {
    return <>{children}</>;
  }

  if (isAuth.isError) {
    return <ErrorPage />;
  }

  return <LoaderFull />;
};
