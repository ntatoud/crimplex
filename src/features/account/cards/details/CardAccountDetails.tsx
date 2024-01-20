import { FC, useState } from 'react';

import { Pencil, Undo } from 'lucide-react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';

import { CardAccountProps } from '../types';
import CardAccountDetailsForm from './CardAccountDetailsForm';
import CardAccountDetailsOverview from './CardAccountDetailsOverview';

const VIEWS: Record<
  'true' | 'false',
  FC<CardAccountProps> | FC<CardAccountProps & { changeView: () => void }>
> = {
  false: CardAccountDetailsOverview,
  true: CardAccountDetailsForm,
} as const;
const CardAccountDetails: FC<CardAccountProps> = ({ account }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const changeView = () => setIsEditMode((x) => !x);
  const CardContentView = VIEWS[isEditMode ? 'true' : 'false'];
  const ToggleIcon = isEditMode ? Undo : Pencil;
  return (
    <Card id="card-account-details">
      <CardHeader>
        <div className="flex flex-1 items-center">
          <CardTitle>Profile Information</CardTitle>
          <Toggle
            size="sm"
            className="text-xs ml-auto"
            variant="outline"
            onClick={changeView}
          >
            {isEditMode ? 'Cancel' : 'Edit'}
            <ToggleIcon className="w-4 h-4 ml-2" />
          </Toggle>
        </div>
      </CardHeader>
      <CardContentView account={account} changeView={changeView} />
    </Card>
  );
};

export default CardAccountDetails;
