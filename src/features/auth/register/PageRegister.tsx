import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import Logo from '@/components/Icons/Logo';

import Illustration from '../Illustration';
import RegisterForm from './RegisterForm';

const PageRegister = () => {
  return (
    <div className="flex flex-1">
      <Illustration />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-grow flex-col max-w-sm gap-14">
          <div className="flex flex-col gap-5 items-center ">
            <Logo width={100} height={100} />
            <h2 className="flex items-center gap-1 text-md">
              Already have an account ?
              <Link
                href="/login"
                className="flex gap-1 items-center hover:underline text-primary"
              >
                Log in
                <ArrowRight className="h-4" />
              </Link>
            </h2>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default PageRegister;
