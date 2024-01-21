import { useState } from 'react';

import { UserAccount } from '@/server/config/schemas/Account';

import AccountDetailsForm from './AccountDetailsForm';
import AccountDetailsOverview from './AccountDetailsOverview';

export interface AccountDetailsProps {
  account: UserAccount;
}

export interface AccountDetailsViewProps extends AccountDetailsProps {
  changeView: () => void;
}
const VIEWS: Record<
  'true' | 'false',
  (props: AccountDetailsViewProps) => JSX.Element
> = {
  false: AccountDetailsOverview,
  true: AccountDetailsForm,
} as const;

const AccountDetails = ({ account }: AccountDetailsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const AccountDetailsView = VIEWS[isEditMode ? 'true' : 'false'];

  return (
    <AccountDetailsView
      account={account}
      changeView={() => setIsEditMode((x) => !x)}
    />
  );
};

export default AccountDetails;
