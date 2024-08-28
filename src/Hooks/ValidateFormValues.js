import { useCallback } from 'react';

const useValidation = () => {
  const validate = useCallback((values) => {
    const cardNumberRegex = /^(?:\d{4} ){3}\d{3,4}$|^\d{15,16}$/;
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
    if (!values.cardName) errors.cardName = 'Nombre del titular es requerido';

    if (!values.cardNumber) {
      errors.cardNumber = 'Número de la tarjeta es requerido';
    } else if (!cardNumberRegex.test(values.cardNumber)) {
      errors.cardNumber = 'Número de la tarjeta no es válido';
    }

    if (!values.expiryMonth) errors.expiryMonth = 'Mes de caducidad es requerido';
    if (!values.expiryYear) errors.expiryYear = 'Año de caducidad es requerido';
    if (!values.cvc) {
      errors.cvc = 'CVC es requerido';
    } else if (!/^\d{3,4}$/.test(values.cvc)) {
      errors.cvc = 'CVC no es válido';
    }
    if (!values.termsAccepted) {
      errors.termsAccepted = 'Debe aceptar las condiciones generales';
    }
    if (!values.siteTermsAccepted){
      errors.siteTermsAccepted = 'Debe aceptar los Términos y Condiciones del sitio web';
    } 
    
    return errors;
  }, []);

  return validate;
};

export default useValidation;