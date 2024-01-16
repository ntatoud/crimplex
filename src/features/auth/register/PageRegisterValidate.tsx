import Logo from '@/components/Icons/Logo';

import Illustration from '../Illustration';
import { RegisterValidateForm } from './RegisterValidateForm';

const PageRegisterValidate = () => (
  <div className="flex flex-1">
    <Illustration />
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-grow flex-col max-w-sm gap-14">
        <div className="flex flex-col gap-5 items-center ">
          <Logo width={100} height={100} />
        </div>
        <RegisterValidateForm />
      </div>
    </div>
  </div>
);

export default PageRegisterValidate;
