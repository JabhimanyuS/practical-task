import axios from 'axios';

const convertCurrency = async (from, to, amount) => {
  const config = {
    headers: { apikey: `hkI2dWyNt3ZQCquwKEUHKJpYOWTW62Nv` },
    params: {
      from,
      to,
      amount,
    },
  };
  const response = await axios.get(`https://api.apilayer.com/exchangerates_data/convert`, config);
  return response;
};

export default convertCurrency;
