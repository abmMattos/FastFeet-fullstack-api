import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card.tsx';
import { Input } from '../../components/ui/input.tsx';
import { Button } from '../../components/ui/button.tsx';
import { Label } from '../../components/ui/label.tsx';
import logo from '../../assets/fastfeet-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.tsx';

type FormData = {
  cpf: string;
  password: string;
};

type UserType = 'ADMIN' | 'ENTREGADOR';

export const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    cpf: '',
    password: '',
  });

  const [userType, setUserType] = useState<UserType>('ADMIN');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUserTypeChange = (value: UserType) => {
    setUserType(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userType === 'ADMIN') {
        const adminId = 'ADMIN_ID';
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/login`,
          formData,
        );
        console.log(response.data);
        localStorage.setItem('userId', adminId);
        localStorage.setItem('userType', userType);
        navigate('/encomendas');
      }

      if (userType === 'ENTREGADOR') {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/deliveryman/login`,
          formData,
        );
        console.log(response.data);
        localStorage.setItem('userId', response.data);
        localStorage.setItem('userType', userType);
        navigate('/encomendas');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-emerald-900">
      <Card className="w-[360px] p-2">
        <CardHeader className="text-center">
          <div className="px-1 flex justify-center items-center">
            <img src={logo} className="max-w-32" alt="Logo" />
          </div>
          <CardTitle className="text-lg">Entre na sua conta</CardTitle>
          <CardDescription className="text-sm">
            Insira o CPF e senha para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" value={formData.cpf} onChange={handleChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 mt-4">
              <Label htmlFor="userType" className={'mb-0.5'}>
                Tipo de Usuário
              </Label>
              <Select value={userType} onValueChange={handleUserTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tipo de usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo de Usuário</SelectLabel>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="ENTREGADOR">ENTREGADOR</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full mt-4" type="submit">
              Entrar
            </Button>
          </form>
          {errorMessage && (
            <CardDescription className="text-red-500 text-center mt-4">
              {errorMessage}
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <CardDescription>
            Ainda não tem uma conta?{' '}
            <Link
              className="text-emerald-500 hover:text-emerald-400"
              to="/registro"
            >
              Crie uma aqui
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
