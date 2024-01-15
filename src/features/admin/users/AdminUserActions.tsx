import {
  CheckCircle,
  MoreVertical,
  PencilLine,
  Trash,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { trpc } from '@/lib/trpc/client';
import { User } from '@/server/config/schemas/User';

const AdminUserActions = ({ user }: { user: User }) => {
  const trpcUtils = trpc.useUtils();

  const userActivate = trpc.users.activate.useMutation({
    onSuccess: async ({ email, name }) => {
      trpcUtils.users.getAll.invalidate();
      toast.success('User Activated', {
        description: `User ${name ?? email} activated with success`,
      });
    },
    onError: () => {
      toast.error('Activation Failed', {
        description: `Failed to activate ${user.name ?? user.email}`,
      });
    },
  });

  const userDeactivate = trpc.users.deactivate.useMutation({
    onSuccess: async ({ email, name }) => {
      trpcUtils.users.getAll.invalidate();
      toast.success('User Deactivated', {
        description: `User ${name ?? email} deactivated with success`,
      });
    },
    onError: () => {
      toast.error('Deactivated Failed', {
        description: `Failed to deactivated ${user.name ?? user.email}`,
      });
    },
  });

  const userDelete = trpc.users.deleteById.useMutation({
    onSuccess: async ({ email, name }) => {
      trpcUtils.users.getAll.invalidate();
      toast.success('User Deleted', {
        description: `User ${name ?? email} deleted with success`,
      });
    },
    onError: () => {
      toast.error('Deletion Failed', {
        description: `Failed to delete ${user.name ?? user.email}`,
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {user.isActivated && (
          <DropdownMenuItem
            onClick={() => userDeactivate.mutate({ id: user.id })}
          >
            <XCircle className="pr-1" />
            Deactivate
          </DropdownMenuItem>
        )}
        {!user.isActivated && (
          <DropdownMenuItem
            onClick={() => userActivate.mutate({ id: user.id })}
          >
            <CheckCircle className="pr-1" />
            Activate
          </DropdownMenuItem>
        )}

        <DropdownMenuItem>
          <Link
            href={`/admin/users/${user.id}`}
            className="flex flex-grow items-center"
          >
            <PencilLine className="pr-1" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => userDelete.mutate({ id: user.id })}
          className="text-red-500"
        >
          <Trash className="pr-1" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminUserActions;
