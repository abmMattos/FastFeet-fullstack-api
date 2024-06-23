import { Package } from '../../package/domain/package.model.ts';

export interface Deliveryman {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  location?: string;
  package: Package[];
}
