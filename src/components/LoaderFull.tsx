import React from 'react';

import { Loader2 } from 'lucide-react';

export const LoaderFull = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};
