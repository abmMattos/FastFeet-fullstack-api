import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../../../../components/ui/card.tsx';
import { Package } from '../../domain/package.model.ts';
import { PackageDeliveryman } from '../../domain/package-deliveryman.model.ts';
import { PackageUser } from '../../domain/package-user.model.ts';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Pen, Trash } from 'lucide-react';

export const PackagesTable = () => {
  const [packageData, setPackageData] = useState<Package[]>([]);
  const [deliverymanData, setDeliverymanData] = useState<PackageDeliveryman[]>(
    [],
  );
  const [userData, setUserData] = useState<PackageUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const userType = localStorage.getItem('userType');

        const packageResponse = await axios.post<Package[]>(
          `${import.meta.env.VITE_API_URL}/package`,
          { userId: userId, userType: userType },
        );

        const packages = packageResponse.data;

        setPackageData(packages);

        const deliverymanIds = packages.map((pkg) => pkg.deliveryman_id);
        const userIds = packages.map((pkg) => pkg.user_id);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/package/findManyDeliveryUser`,
          { deliverymen_ids: deliverymanIds, users_ids: userIds },
        );

        setDeliverymanData(response.data.deliverymen);
        setUserData(response.data.users);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDeliverymanName = (id: string) => {
    const deliveryman = deliverymanData.find((dm) => dm.id === id);
    return deliveryman ? deliveryman.name : 'Desconhecido';
  };

  const getUserName = (id: string) => {
    const user = userData.find((u) => u.id === id);
    return user ? user.name : 'Desconhecido';
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/package/delete`, {
        data: { id },
      });
      setPackageData(packageData.filter((pkg) => pkg.id !== id));
      toast.success('Pacote deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar pacote:', error);
      toast.error('Erro ao deletar pacote.');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/encomendas/editar/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="container mx-auto p-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-32 bg-gray-300 rounded w-full mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardContent>
        <Toaster />
        <div className="overflow-x-auto pt-6">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Localização
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Usuário
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Entregador
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {packageData.map((pkg, index) => (
                <tr
                  key={pkg.id}
                  className="border-b border-gray-200 text-gray-500 font-semibold"
                >
                  <td className="px-6 py-4 whitespace-no-wrap">#{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {pkg.location}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {getUserName(pkg.user_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {getDeliverymanName(pkg.deliveryman_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(pkg.status)}`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td className="flex items-center px-6 whitespace-no-wrap">
                    <Pen
                      className={
                        ' text-teal-400 hover:text-teal-500 cursor-pointer mr-2'
                      }
                      onClick={() => handleEdit(pkg.id)}
                      size={20}
                    />
                    {userType === 'ADMIN' && (
                      <Trash
                        className={
                          'text-red-400 hover:text-red-500 cursor-pointer'
                        }
                        onClick={() => handleDelete(pkg.id)}
                        size={20}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ENTREGUE':
      return 'bg-green-100 text-green-700';
    case 'AGUARDANDO':
      return 'bg-yellow-100 text-yellow-700';
    case 'RETIRADA':
      return 'bg-blue-100 text-blue-700';
    case 'DEVOLVIDA':
      return 'bg-red-100 text-red-700';
    default:
      return '';
  }
};

export default PackagesTable;
