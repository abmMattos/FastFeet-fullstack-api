import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card.tsx';
import { ChangeEvent, FormEvent } from 'react';
import { Label } from '../../../../components/ui/label.tsx';
import { Input } from '../../../../components/ui/input.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../../components/Header.tsx';

type UpdateReceiverData = {
  name: string;
  email: string;
  cpf: string;
  location: string;
};

export const UpdateReceiverPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<UpdateReceiverData>({
    name: '',
    email: '',
    cpf: '',
    location: '',
  });

  useEffect(() => {
    const fetchReceiverData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${id}`,
        );
        const receiverData = response.data;
        setFormData({
          name: receiverData.name,
          email: receiverData.email,
          cpf: receiverData.cpf,
          location: receiverData.location,
        });
      } catch (error) {
        console.error('Erro ao buscar dados do destinatário:', error);
      }
    };

    fetchReceiverData();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update/${id}`,
        formData,
      );
      console.log(response.data);
      toast.success('Entregador atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar destinatário.');
    }
  };

  return (
    <>
      <section className={'bg-emerald-900 min-h-screen'}>
        <Header />
        <div className={'p-12'}>
          <Toaster />
          <Button
            className={
              'mb-6 bg-emerald-300 hover:bg-emerald-400 text-gray-800 font-bold'
            }
          >
            <Link
              className={'flex justify-center items-center'}
              to={'/destinatarios'}
            >
              <ArrowLeft size={'20'} className={'mr-2'} /> VOLTAR
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>ATUALIZAR UM DESTINATÁRIO</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button className={'w-full mt-4'} type="submit">
                  Atualizar destinatário
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default UpdateReceiverPage;
