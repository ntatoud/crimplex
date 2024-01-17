import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import Logo from '@/components/Icons/Logo';

import Illustration from '../Illustration';
import LoginForm from './LoginForm';

const PageLogin = () => {
  return (
    <div className="flex flex-1">
      <Illustration />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-grow flex-col max-w-sm gap-14">
          <div className="flex flex-col gap-5 items-center ">
            <Logo width={240} height={80} />
            <h2 className="flex items-center gap-1 text-md">
              Want to join us ?
              <Link
                href="/register"
                className="flex gap-1 items-center hover:underline text-primary"
              >
                Create an account
                <ArrowRight className="h-4" />
              </Link>
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
