import Logo from './Icons/Logo';
import { Badge } from './ui/badge';

const AdminLogo = () => {
  return (
    <>
      <Logo width={40} height={40} />
      <div className="relative flex items-end h-11">
        <div className="font-bold uppercase">Crimplex</div>
        <Badge
          variant="default"
          className="absolute text-xs top-0 left-0 py-0.5 px-1 ml-[-0.5rem] opacity-75"
        >
          Admin
        </Badge>
      </div>
    </>
  );
};

export default AdminLogo;
