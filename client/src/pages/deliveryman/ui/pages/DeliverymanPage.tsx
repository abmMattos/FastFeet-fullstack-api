import { Header } from '../../../../components/Header.tsx';
import DeliverymanTable from '../components/DeliverymanTable.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import { PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export const DeliverymanPage = () => {
  return (
    <>
      <section className={'bg-emerald-900 min-h-screen'}>
        <Header />
        <div className={'p-12'}>
          <Button
            className={
              'flex mb-6 ml-auto bg-emerald-300 hover:bg-emerald-400 text-gray-800 font-bold'
            }
          >
            <Link
              className={'flex justify-center items-center'}
              to={'/entregadores/registrar'}
            >
              <PlusIcon className={'mr-2'} /> REGISTRAR ENTREGADOR
            </Link>
          </Button>
          <DeliverymanTable />
          <Link to={'/entregadores/registrar'} />
          <Link to={'/entregadores/editar/:id'} />
        </div>
      </section>
    </>
  );
};

export default DeliverymanPage;
