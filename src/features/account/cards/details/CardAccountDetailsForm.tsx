import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FieldProfilePicture from '@/components/FieldProfilePicture';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc/client';
import { UserAccount, zUserAccount } from '@/server/config/schemas/Account';

import { CardAccountProps } from '../types';

type AccountUpdateField = Prettify<Pick<UserAccount, 'name' | 'email'>>;

const CardAccountDetailsForm: FC<
  CardAccountProps & { changeView: () => void }
> = ({ account, changeView }) => {
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

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start gap-4">
          <FieldProfilePicture
            fallback={
              account.name
                .split(' ')
                .map((word) => word[0])
                .join('') ?? account.email
            }
          />
          <div className="grid gap-2">
            <div className="flex flex-col">
              <div className="font-semibold text-lg">
                <Input
                  className={errors.name ? 'ring-2 ring-red-500' : ''}
                  defaultValue={account.name}
                  {...register('name')}
                />
                {errors?.name && (
                  <p className="text-sm text-red-500">{errors.name?.message}</p>
                )}
              </div>
              <span className="text-sm text-muted-foreground ml-3">
                Joined in {dayjs(account?.creationDate).format('MMMM YYYY')}
              </span>
            </div>
            <div className="text-md text-gray-800 dark:text-gray-200">
              <div>
                <Input
                  className={errors.email ? 'ring-2 ring-red-500' : ''}
                  defaultValue={account.email}
                  {...register('email')}
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-fit place-self-end"
              variant="secondary"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </div>
      </form>
    </CardContent>
  );
};

export default CardAccountDetailsForm;
