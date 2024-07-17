import axios from 'axios';

export interface IFormState {
  firstName: string;
  email: string;
  phone: string;
  address: string;
  message?: string | null;
  date: Date;
}

const sendingEmail = async (formData: IFormState): Promise<void> => {
  await axios.post('/api/contact', formData);
};

export default sendingEmail;
