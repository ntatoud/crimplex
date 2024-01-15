import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc/client';

const PageAccount = () => {
  const trpcUtils = trpc.useUtils();
  const router = useRouter();
  const { mutate: userLogout } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      router.push('/login');
      trpcUtils.auth.isAuth.setData(undefined, { status: false });
      toast.success('Success', {
        description: 'Logged out',
      });
    },
  });

  return (
    <MaxWidthWrapper>
      <Button variant="destructive" onClick={() => userLogout()}>
        <LogOut />
        Log out
      </Button>
    </MaxWidthWrapper>
  );
};

export default PageAccount;
