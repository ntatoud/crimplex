import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Logo from '@/components/Icons/Logo';
import { Button } from '@/components/ui/button';

import Illustration from '../Illustration';
import { RegisterValidateForm } from './RegisterValidateForm';

const PageRegisterValidate = () => {
  const router = useRouter();
  return (
    <div className="flex flex-1">
      <Illustration />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-grow flex-col max-w-sm gap-14">
          <div className="flex flex-col items-center">
            <Button
              variant="secondary"
              className="place-self-start w-fit"
              onClick={() => router.back()}
            >
              <ArrowLeft />
              Go back
            </Button>
            <Logo width={100} height={100} />
          </div>

          <RegisterValidateForm />
        </div>
      </div>
    </div>
  );
};

export default PageRegisterValidate;
