import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/lib/trpc/client';

export const RegisterValidateForm = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const token = params?.token?.toString() ?? '';
  const email = searchParams.get('email');

  const onCodeValidateSuccess = useOnCodeValidateSuccess();
  //   const onCodeValidateError = useOnCodeValidateError();

  const { mutate: userRegisterValidate, isLoading } =
    trpc.auth.registerValidate.useMutation({
      onSuccess: onCodeValidateSuccess,
      //   onError: onCodeValidateError,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>();

  const onSubmit = ({ code }: { code: string }) => {
    userRegisterValidate({ code, token });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 text-lg">
          <div className="grid gap-2">
            <Label htmlFor="code">Verification Code for {email}</Label>
            <Input
              id="code"
              type="text"
              disabled={isLoading}
              {...register('code')}
            />
            {errors?.code && (
              <p className="text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>
          <Button
            className="h-12 text-lg mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Confirm'}
          </Button>
        </div>
      </form>
    </div>
  );
};
export const useOnCodeValidateSuccess = () => {
  const router = useRouter();

  const queryCache = useQueryClient();
  const searchParams = useSearchParams();
  return async () => {
    queryCache.clear();

    router.push(searchParams.get('redirect') || '/login');
    toast.success('Success', {
      description: 'Your account has been activated',
    });
  };
};

export const useOnCodeValidateError = () => {};
