import { useState } from 'react';

const useFormValuesPse = () => {

  const [formValues, setFormValues] = useState({
        name: '',
        apellido: '',
        email: '',
        phone: '',
        address: '1212213',
        city: 'medellin',
        country: '471',
        termsAccepted: false,
        siteTermsAccepted: false,
        banks:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'termsAccepted') {
      const inputValue = value.toLowerCase().trim(); // Convertir a minúsculas y eliminar espacios adicionales
      const accepted = inputValue === 'false';
      setFormValues({ ...formValues, [name]: accepted });
    } else if (name === 'siteTermsAccepted') {
      const inputValue = value.toLowerCase().trim(); // Convertir a minúsculas y eliminar espacios adicionales
      const acceptede = inputValue === 'false';
      setFormValues({ ...formValues, [name]: acceptede });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  return [formValues, handleChange];
};

export default useFormValuesPse;