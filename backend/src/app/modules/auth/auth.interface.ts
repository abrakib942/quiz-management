export type user = {
  id: string;
  name: string;
  email: string;
  role: ['admin', 'performer'];
  password?: string;
};
