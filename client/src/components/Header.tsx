import logo from '../assets/fastfeet-logo.png';
import { cn } from '../lib/utils.ts';
import { useLocation } from 'react-router';

export const Header = () => {
  const location = useLocation();

  const isActive = (route: string) => location.pathname === route;

  const navItemClass = (route: string) =>
    cn(
      'cursor-pointer',
      isActive(route)
        ? 'text-emerald-400'
        : 'hover:text-emerald-500 text-gray-400',
    );
  return (
    <header
      className={
        'bg-white justify-between flex items-center p-4 border-b border-solid border-slate-200 shadow-sm'
      }
    >
      <div className={'max-w-32 mr-6'}>
        <img src={logo} alt={'Logo'} />
      </div>
      <div>
        <ul className={'flex space-x-6 font-semibold text-gray-400'}>
          <li className={navItemClass('/encomendas')}>ENCOMENDAS</li>
          <li className={navItemClass('/entregadores')}>ENTREGADORES</li>
          <li className={navItemClass('/destinatarios')}>DESTINATÁRIOS</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
