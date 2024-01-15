import { Github } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';

const PageHome = () => {
  return (
    <MaxWidthWrapper className="flex flex-col items-center mt-5">
      <Alert className="max-w-lg">
        <Github className="h-5 w-5" />
        <AlertTitle>Get on GitHub !</AlertTitle>
        <AlertDescription>
          <a href="" className={buttonVariants({ variant: 'link' })}>
            RepoStarter
          </a>
        </AlertDescription>
      </Alert>
    </MaxWidthWrapper>
  );
};

export default PageHome;
