import { Header } from '../../../../components/Header.tsx';
import ReceiverTable from '../components/ReceiverTable.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import { PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export const ReceiverPage = () => {
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
                to={'/destinatarios/registrar'}
              >
                <PlusIcon className={'mr-2'} /> REGISTRAR DESTINATÁRIO
              </Link>
            </Button>
          )}

          <ReceiverTable />
          <Link to={'/destinatarios/registrar'} />
          <Link to={'/destinatarios/editar/:id'} />
        </div>
      </section>
    </>
  );
};

export default ReceiverPage;
