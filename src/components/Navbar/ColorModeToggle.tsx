import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Switch } from '../ui/switch';

export const ColorModeToggle = ({
  showLabel = false,
}: {
  showLabel?: boolean;
}) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex gap-1.5 items-center px-1" key={theme}>
      <div className="flex gap-1">
        {showLabel && <p className="text-muted-foreground">Light Mode</p>}
        <Sun />
      </div>
      <Switch
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        checked={isDark}
      />
      <div className="flex gap-1">
        <Moon />
        {showLabel && <p className="text-muted-foreground">Dark Mode</p>}
      </div>
    </div>
  );
};
