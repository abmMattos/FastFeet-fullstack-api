import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../../../../components/ui/card.tsx';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Pen, Trash } from 'lucide-react';
import { Receiver } from '../../domain/receiver.model.ts';

export const ReceiverTable = () => {
  const [deliverymanData, setReceiverData] = useState<Receiver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deliverymanResponse = await axios.get<Receiver[]>(
          `${import.meta.env.VITE_API_URL}/user`,
        );
        const receivers = deliverymanResponse.data;
        setReceiverData(receivers);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete`, {
        data: { id },
      });
      setReceiverData(deliverymanData.filter((dm) => dm.id !== id));
      toast.success('Destinatario deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar destinatário:', error);
      toast.error('Erro ao deletar destinatário.');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/destinatarios/editar/${id}`);
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
                  Nome
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  CPF
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Localização
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-lg font-bold leading-4 text-emerald-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {deliverymanData.map((dm, index) => (
                <tr
                  key={dm.id}
                  className="border-b border-gray-200 text-gray-500 font-semibold"
                >
                  <td className="px-6 py-4 whitespace-no-wrap">#{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{dm.name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{dm.email}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{dm.cpf}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {dm.location ?? 'Não especificado'}
                  </td>
                  <td className="flex items-center px-6 whitespace-no-wrap">
                    <Pen
                      className={
                        'text-teal-400 hover:text-teal-500 cursor-pointer mr-2'
                      }
                      onClick={() => handleEdit(dm.id)}
                      size={20}
                    />
                    <Trash
                      className={
                        'text-red-400 hover:text-red-500 cursor-pointer'
                      }
                      onClick={() => handleDelete(dm.id)}
                      size={20}
                    />
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

export default ReceiverTable;
