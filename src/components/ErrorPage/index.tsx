'use client';

import { ReactNode } from 'react';

import { ArrowLeft, SearchX, ShieldAlert, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from '../Icons/Logo';
import { Button } from '../ui/button';
import Illustration from './illustration.png';

interface ErrorPageProps {
  errorCode?: 403 | 404;
}

const Errors: Record<
  403 | 404 | 'default',
  { icon: ReactNode; message: string; title: string }
> = {
  403: {
    icon: <ShieldAlert className="w-12 h-12" />,
    title: 'Unauthorized',
    message: 'You are not supposed to be here.',
  },
  404: {
    icon: <SearchX className="w-12 h-12" />,
    title: 'Page not found',
    message: 'This page does not exist or the url has changed.',
  },
  default: {
    icon: <XCircle className="w-12 h-12" />,
    title: 'Unknown Error',
    message: 'There was a problem',
  },
};
export const ErrorPage = ({ errorCode }: ErrorPageProps) => {
  const router = useRouter();

  const { icon, message, title } = Errors[errorCode ?? 'default'];
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-start">
        <Button
          variant="ghost"
          className="mb-[-5rem] z-10"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Go back
        </Button>
        <div className="flex items-center text-left">
          <div className="relative">
            <Image src={Illustration} placeholder="blur" alt="illustration" />
          </div>

          <div className="flex flex-col gap-5 items-start">
            <Link href="/admin" className="flex items-end h-full ml-[-1.5rem]">
              <div className="relative flex items-end ">
                <Logo width={150} height={150} />
                <div className="font-bold uppercase text-3xl text-secondary-foreground mb-5 ml-[-1rem]">
                  Crimplex
                </div>
              </div>
            </Link>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-4xl font-extrabold">{title}</p>
                <div className="text-red-600">{icon}</div>
              </div>
              <p className="text-lg">{message}</p>
            </div>

            <p className="text-muted-foreground">
              Error {errorCode ?? 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
