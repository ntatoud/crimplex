import { PropsWithChildren } from 'react';

const Viewport = ({ children }: PropsWithChildren) => {
  return <div className="relative flex flex-col min-h-screen">{children}</div>;
};

export default Viewport;
