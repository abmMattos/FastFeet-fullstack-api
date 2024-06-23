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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select.tsx';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../../components/Header.tsx';

type UpdatePackageData = {
  user_name: string;
  status: string;
  deliveryman_name: string;
  location: string;
};

export const UpdatePackagePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<UpdatePackageData>({
    user_name: '',
    status: '',
    deliveryman_name: '',
    location: '',
  });

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/package/${id}`,
        );
        const { user, deliveryman, ...packageData } = response.data;
        setFormData({
          user_name: user.name,
          status: packageData.status,
          deliveryman_name: deliveryman.name,
          location: packageData.location,
        });
      } catch (error) {
        console.error('Erro ao buscar dados do pacote:', error);
      }
    };

    fetchPackageData();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/package/update/${id}`,
        formData,
      );
      console.log(response.data);
      toast.success('Encomenda atualizada com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar encomenda.');
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
              to={'/encomendas'}
            >
              <ArrowLeft size={'20'} className={'mr-2'} /> VOLTAR
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>ATUALIZAR UMA ENCOMENDA</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="user_name">Nome do usuário</Label>
                    <Input
                      id="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione um status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="ENTREGUE">ENTREGUE</SelectItem>
                          <SelectItem value="DEVOLVIDA">DEVOLVIDA</SelectItem>
                          <SelectItem value="RETIRADA">RETIRADA</SelectItem>
                          <SelectItem value="AGUARDANDO">AGUARDANDO</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="deliveryman_name">Nome do entregador</Label>
                    <Input
                      id="deliveryman_name"
                      value={formData.deliveryman_name}
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
                  Atualizar encomenda
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default UpdatePackagePage;
