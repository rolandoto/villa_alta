import { useCallback } from 'react';

const useValidationPse = () => {
  const validate = useCallback((values) => {
    const errors = {};
    if (!values.name) errors.name = 'Nombre es requerido';
    if (!values.apellido) errors.apellido = 'Apellido es requerido';

    if (!values.email) {
      errors.email = 'Email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email no es válido';
    }
    if (!values.phone) errors.phone = 'Número de teléfono es requerido';
    if (!values.address) errors.address = 'Dirección es requerida';
    if (!values.city) errors.city = 'Ciudad es requerida';
    if (!values.country) errors.country = 'País es requerido';
    if (Number(values.banks) <= 0) {
        errors.banks = 'Debe seleccionar un banco';
    }
    if (!values.termsAccepted) {
      errors.termsAccepted = 'Debe aceptar las condiciones generales';
    }
    if (!values.siteTermsAccepted) {
      errors.siteTermsAccepted = 'Debe aceptar los términos del sitio';
    }
    return errors;
  }, []);

  return validate;  
};

export default useValidationPse;
