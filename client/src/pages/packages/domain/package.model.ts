export interface Package {
  id: string;
  status: string;
  location: string;
  photo?: string | null;
  deliveryman_id: string;
  user_id: string;
}
