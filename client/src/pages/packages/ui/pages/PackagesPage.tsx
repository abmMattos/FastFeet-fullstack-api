import { Header } from '../../../../components/Header.tsx';
import PackagesTable from '../components/PackagesTable.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import { PlusIcon } from '@radix-ui/react-icons';
import { Link, Route, Routes } from 'react-router-dom';
import UpdatePackagePage from './UpdatePackagePage.tsx';

export const PackagesPage = () => {
  const userType = localStorage.getItem('userType');

  return (
    <>
      <section className={'bg-emerald-900 min-h-screen'}>
        <Header />
        <div className={'p-12'}>
          {userType === 'ADMIN' && (
            <Button
              className={
                'flex mb-6 ml-auto bg-emerald-300 hover:bg-emerald-400 text-gray-800 font-bold'
              }
            >
              <Link
                className={'flex justify-center items-center'}
                to={'/encomendas/registrar'}
              >
                <PlusIcon className={'mr-2'} /> REGISTRAR ENCOMENDA
              </Link>
            </Button>
          )}

          <Routes>
            <Route path="/" element={<PackagesTable />} />
            <Route path="/editar/:id" element={<UpdatePackagePage />} />
          </Routes>
        </div>
      </section>
    </>
  );
};

export default PackagesPage;
