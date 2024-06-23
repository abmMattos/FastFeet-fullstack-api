import { useEffect, useState } from 'react';
import axios from 'axios';
import { Package } from '../../domain/package.model.ts';
import { Card, CardContent } from '../../../../components/ui/card.tsx';
import { PackageDeliveryman } from '../../domain/package-deliveryman.model.ts';

export const PackagesTable = () => {
  const [packageData, setPackageData] = useState<Package[]>([]);
  const [deliverymanData, setDeliverymanData] = useState<PackageDeliveryman[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageResponse = await axios.get<Package[]>(
          `${import.meta.env.VITE_API_URL}/package`,
        );
        const packages = packageResponse.data;
        setPackageData(packages);

        const deliverymanIds = packages.map((pkg) => pkg.deliveryman_id);

        const deliverymenResponse = await axios.post<PackageDeliveryman[]>(
          `${import.meta.env.VITE_API_URL}/package/findManyDeliveryUser`,
          { ids: deliverymanIds },
        );
        setDeliverymanData(deliverymenResponse.data);
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
                  Entregador
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Status
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
                    {getDeliverymanName(pkg.deliveryman_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(pkg.status)}`}
                    >
                      {pkg.status}
                    </span>
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
    case 'PENDENTE':
      return 'bg-yellow-100 text-yellow-700';
    case 'RETIRADA':
      return 'bg-blue-100 text-blue-700';
    case 'CANCELADA':
      return 'bg-red-100 text-red-700';
    case 'INCOMPLETO':
      return 'bg-gray-100 text-gray-700';
    case 'COMPLETO':
      return 'bg-green-200 text-green-800';
    default:
      return '';
  }
};

export default PackagesTable;
