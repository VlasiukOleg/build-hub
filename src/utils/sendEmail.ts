import axios from 'axios';

const sendingEmail = async (formData): Promise<void> => {
  await axios.post('/api/contact', formData);
};

export default sendingEmail;
