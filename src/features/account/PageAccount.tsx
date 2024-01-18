import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { LoaderFull } from '@/components/LoaderFull';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { trpc } from '@/lib/trpc/client';

import AdminAlert from '../admin/AdminAlert';
import AccountDetails from './AccountDetails';

const PageAccount = () => {
  const trpcUtils = trpc.useUtils();
  const { data: account } = trpc.account.get.useQuery();
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

  if (!account) return <LoaderFull />;

  return (
    <MaxWidthWrapper className="flex flex-col gap-2 md:flex-row">
      <div className="flex flex-col w-full h-fit gap-4 justify-start items-start py-5 px-2 md:w-fit md:h-full">
        <AccountDetails account={account} />
        <Separator />
        <Button
          variant="destructive"
          className="place-self-end md:w-full"
          onClick={() => userLogout()}
        >
          <LogOut />
          Log out
        </Button>
      </div>

      <Separator orientation="vertical" className="hidden my-5 md:block" />
      <Separator className="md:hidden" />

      <div className="flex flex-1 flex-col items-center py-5">
        <div>{account?.authorizations.includes('admin') && <AdminAlert />}</div>
        <div></div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PageAccount;
