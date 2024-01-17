import Link from 'next/link';

import Logo from '@/components/Icons/Logo';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import Illustration from '../Illustration';
import RegisterForm from './RegisterForm';

const PageRegister = () => {
  return (
    <div className="flex flex-1">
      <Illustration />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col max-w-sm gap-10">
          <div className="flex flex-grow flex-col pb-5 items-center">
            <div className="flex flex-col gap-0">
              <Logo width={240} height={80} />
              <p className="text-secondary-foreground font-light italic">
                Climbing has never been so easy.
              </p>
            </div>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default PageRegister;
