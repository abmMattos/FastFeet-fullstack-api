import { Header } from '../../../../components/Header.tsx';
import PackagesTable from '../components/PackagesTable.tsx';

export const PackagesPage = () => {
  return (
    <>
      <section className={'bg-emerald-900 min-h-screen'}>
        <Header />
        <div className={'p-12'}>
          <PackagesTable />
        </div>
      </section>
    </>
  );
};

export default PackagesPage;
