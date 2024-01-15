import Document from './Document';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Document>{children}</Document>;
}
