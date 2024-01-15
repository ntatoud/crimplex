import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Logo from '@/components/Icons/Logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc/client';
import {
  AuthCredentials,
  zAuthCredentials,
} from '@/server/config/schemas/Auth';

const PageAdminLogin = () => {
  const router = useRouter();
  const trpcUtils = trpc.useUtils();
  const { mutate: userLogin, isLoading } = trpc.auth.login.useMutation({
    onSuccess: () => {
      router.push('/admin');
      trpcUtils.auth.isAuth.setData(undefined, { status: true });
      trpcUtils.auth.isAuth.invalidate();
      toast.success('Success', {
        description: 'Connection successful',
        className: 'bg-green-600',
      });
    },
    onError: () => {
      toast.error('Error', {
        description: 'Error',
        className: 'bg-red-600',
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<AuthCredentials, 'name'>>({
    resolver: zodResolver(
      zAuthCredentials().pick({ email: true, password: true })
    ),
  });

  const onSubmit = ({ email, password }: Omit<AuthCredentials, 'name'>) => {
    userLogin({ email, password });
  };
  return (
    <>
      <div className="flex items-end">
        <Logo width={80} height={80} />
        <div className="relative flex items-end h-16">
          <div className="font-bold uppercase text-xl mb-1">Crimplex</div>
          <Badge
            variant="default"
            className="absolute text-sm top-0 left-0 py-0.5 px-1 ml-[-0.5rem] opacity-75"
          >
            Admin
          </Badge>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="sm:w-80 sm:max-w-sm md:w-full">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  placeholder="Email"
                  disabled={isLoading}
                  {...register('email')}
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  disabled={isLoading}
                  {...register('password')}
                />
                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button className="flex-1 gap-1" type="submit" disabled={isLoading}>
              {!isLoading ? (
                <>
                  Sign in as <p className="font-bold"> Admin</p>
                </>
              ) : (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default PageAdminLogin;
