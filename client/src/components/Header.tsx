import logo from '../assets/fastfeet-logo.png';
import { cn } from '../lib/utils.ts';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const isActive = (route: string) => location.pathname === route;

  const navItemClass = (route: string) =>
    cn(
      'cursor-pointer',
      isActive(route)
        ? 'text-emerald-500 border-b-2 border-solid border-emerald-500 '
        : 'hover:text-emerald-600 text-gray-400',
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
          <li className={navItemClass('/encomendas')}>
            <Link to={'/encomendas'}>ENCOMENDAS</Link>
          </li>
          <li className={navItemClass('/entregadores')}>
            <Link to={'/entregadores'}>ENTREGADORES</Link>
          </li>
          <li className={navItemClass('/destinatarios')}>
            <Link to={'/destinatarios'}>DESTINATÁRIOS</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
