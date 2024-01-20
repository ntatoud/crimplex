import { FC } from 'react';

import { ColorModeToggle } from '@/components/Navbar/ColorModeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { CardAccountProps } from './types';

const CardAccountSettings: FC<CardAccountProps> = () => {
  return (
    <Card id="card-account-settings">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-5">
          {/* TODO : Language input when language is implemented */}
          <div className="flex flex-col items-start">
            Language
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr" defaultChecked>
                  Français
                </SelectItem>
                <SelectItem value="en" defaultChecked>
                  English
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex flex-col items-start">
            Preferences
            <ColorModeToggle showLabel />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardAccountSettings;
