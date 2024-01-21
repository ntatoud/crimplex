import { Loader2, XCircle } from 'lucide-react';

import { Avatar, AvatarFallback } from '../ui/avatar';

export const AccountMenuLoadingState = () => (
  <Avatar>
    <AvatarFallback className="uppercase">
      <Loader2 className="animate-spin" />
    </AvatarFallback>
  </Avatar>
);

export const AccountMenuErrorState = () => (
  <Avatar>
    <AvatarFallback className="uppercase">
      <XCircle className="text-red-500 animate-spin" />
    </AvatarFallback>
  </Avatar>
);
