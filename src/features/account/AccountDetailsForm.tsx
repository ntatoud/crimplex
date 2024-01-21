import { KeyboardEvent } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Loader2, PenLine, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { trpc } from '@/lib/trpc/client';
import { cn } from '@/lib/utils';
import { UserAccount, zUserAccount } from '@/server/config/schemas/Account';

import { AccountDetailsViewProps } from './AccountDetails';

type AccountUpdateField = Prettify<Pick<UserAccount, 'name' | 'email'>>;

const AccountDetailsForm = ({
  account,
  changeView,
}: AccountDetailsViewProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountUpdateField>({
    resolver: zodResolver(zUserAccount().pick({ name: true, email: true })),
  });
  const onSubmit = (values: AccountUpdateField) => {
    accountUpdate(values);
    setTimeout(() => {
      changeView();
    }, 200);
  };

  const trpcUtils = trpc.useUtils();
  const { mutate: accountUpdate, isLoading } = trpc.account.update.useMutation({
    onSuccess: (variables) => {
      toast.success('Updated with success', {
        description: `User ${
          variables.name ?? variables.email
        } has been updated.`,
      });
      router.refresh();
      trpcUtils.account.invalidate();
    },
    onError: () => {
      toast.error('Error updating user', {
        description: 'The update of the user failed',
      });
    },
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const submitButton = document.querySelector(
        'button[type="submit"]'
      ) as HTMLElement;

      submitButton?.focus();
    }
  };

  return (
    <div className="flex gap-2 md:flex-col">
      <div className="p-5">
        <Avatar className="w-32 h-32 md:w-52 md:h-52 ring-2 ring-offset-4 ring-zinc-800">
          <AvatarImage src="" />
          <AvatarFallback className="relative">
            <User className="w-16 h-16 md:w-32 md:h-32" />
          </AvatarFallback>
        </Avatar>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex w-full justify-between items-center">
            <div>
              <Input
                className={cn(
                  'flex max-w-[9rem] md:max-w-[10rem] h-10',
                  errors.name ? 'ring-2 ring-red-500' : ''
                )}
                onKeyDown={handleKeyDown}
                defaultValue={account.name}
                {...register('name')}
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors.name?.message}</p>
              )}
            </div>
            <Button size="icon" onClick={changeView}>
              <PenLine />
            </Button>
          </div>

          <span className="flex gap-1 text-sm text-muted-foreground">
            Member since{' '}
            <p className="font-semibold">
              {dayjs(account?.creationDate).format('MMMM YYYY')}
            </p>
          </span>
          <Separator />
          <div>
            <Input
              className={cn(
                'h-10 max-w-[12rem] md:max-w-[15.5rem]',
                errors.email ? 'ring-2 ring-red-500' : ''
              )}
              onKeyDown={handleKeyDown}
              defaultValue={account.email}
              {...register('email')}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-fit place-self-end"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              'Update'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;
