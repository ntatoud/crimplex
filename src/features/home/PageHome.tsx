import { AlertCircle } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PageHome = () => {
  return (
    <MaxWidthWrapper className="flex flex-col items-center mt-5">
      <Alert className="max-w-lg">
        <AlertCircle />
        <AlertTitle> ⛰️ Welcome to crimplex</AlertTitle>
        <AlertDescription> Please have a look around !</AlertDescription>
      </Alert>
    </MaxWidthWrapper>
  );
};

export default PageHome;
