import  {useEffect, useState} from 'react';
import UseCart from "../../Hooks/UseCart"
import useReservationCreate from '../../Actions/useReservationCreate';
import { useSelector } from 'react-redux';
import { Toaster } from 'sonner';
import moment from 'moment';
import EmpyCart from '../../Component/EmpyCart/EmpyCart';
import LoadingOverlay from '../../Component/LoadingCreateReserva/LoadingOverlay';
import useFormValues from '../../Hooks/useFormValues';
import useFetchData from '../../Hooks/useFetchData';
import useValidation from '../../Hooks/ValidateFormValues';
import FormCheckout from '../../Component/FormCheckout/FormCheckout';
import ConfirmationMessage from '../../Component/ConfirmationMessage/ConfirmationMessage';
import WhatsappButton from '../../Component/WhatsappButton/WhatsappButton';
import { Environment } from '../../Config/Config';
import HeaderStep from '../../Component/Header/HeaderStep';
import Footer from '../../Component/Footer/Footer';
import useFormValuesPse from '../../Hooks/useFormValuesPse';
import useValidationPse from '../../Hooks/ValidateFormValuesPse';

const Checkout  =() =>{
    useFetchData();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [formErrors, setFormErrors] = useState({});
    const [formValues, handleChange] = useFormValues();
    const [formValuesPse, handleChangePse] = useFormValuesPse();
    const {cart,getCartSubtotal} = UseCart()
    const subtotal = getCartSubtotal()
    const {PostCreateHotel,PostCreateHotelPse} =useReservationCreate()
    const {Country,loading,reservation}= useSelector(state => state.Reservation);
    const {loadingCart} = useSelector(state => state.Cart);
    const cardNumberArray = formValues.cardNumber.split(" ");
    const cardNumberString = cardNumberArray.join("");
    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    const validate = useValidation();
    const validatePse = useValidationPse();
    const [paymentMethod, setPaymentMethod] = useState('PSE');

    const Rooms = cart.map(item => ({
        "roomTypeID": item.roomTypeID,
        "quantity": item.quantity,
        "roomRateID": item.roomRateID,
    }));

    const adults = cart.map(item => ({
        "roomTypeID": item.roomTypeID,
        "quantity": item.person
    }));
    
    const childreen = cart.map(item => ({
        "roomTypeID": item.roomTypeID,
        "quantity": 0
    }));

    const night = cart.map(item => ({
        startDate: item?.startDate,
        endDate: item?.endDate,
        price: item?.Price,
        validCode: item?.validCode
    }));
   
    const subtotalPayment = night.reduce((total, item) => total + (item.price || 0), 0);
    const StartDate = night[0]?.startDate
    const EndDate = night[0]?.endDate
    const validCode = night[0]?.validCode
  
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(paymentMethod=="PSE"){
            const errors = validatePse(formValuesPse);
            setFormErrors(errors);
            if (Object.keys(errors).length === 0) {
                await PostCreateHotelPse({ propertyID:Environment.propertyID,
                            token:Environment.Token,
                            promoCode:validCode,
                            startDate:StartDate,
                            endDate:EndDate,
                            guestFirstName:formValuesPse.name,
                            guestLastName:formValuesPse.apellido,
                            guestEmail:formValuesPse.email,
                            guestPhone:formValuesPse.phone,
                            rooms:Rooms,
                            adults:adults,
                            children:childreen,
                            dateCreated:now,
                            bank:formValuesPse.banks,
                            subtotal:subtotalPayment
                        })}    
        }else if(paymentMethod=="CREDITO"){
            const errors = validate(formValues);
            setFormErrors(errors);
            if (Object.keys(errors).length === 0) {
            await PostCreateHotel({ propertyID:Environment.propertyID,
                                    token:Environment.Token,
                                    promoCode:validCode,
                                    startDate:StartDate,
                                    endDate:EndDate,
                                    guestFirstName:formValues.name,
                                    guestLastName:formValues.apellido,
                                    guestEmail:formValues.email,
                                    guestPhone:formValues.phone,
                                    rooms:Rooms,
                                    adults:adults,
                                    children:childreen,
                                    dateCreated:now,
                                    number:cardNumberString,
                                    exp_month:formValues.expiryMonth,
                                    exp_year:formValues.expiryYear,
                                    cvc:formValues.cvc,
                                    card_holder:formValues.cardName,
                                    subtotal:subtotalPayment
                                })}    
            }
    };

    const FillContent =() =>{

        if(Boolean(reservation)){
            return ( <ConfirmationMessage title={"Reserva creada"} />)
        }

        if(!subtotal > 0){
            return (  <EmpyCart title={"Carrito vacio"} />)
        }else{
            return <FormCheckout 
                      Country={Country}
                      loading={loading}
                      handleSubmit={handleSubmit}
                      formErrors={formErrors}
                      handleChange={handleChange}
                      formValues={formValues}
                      cart={cart}
                      subtotal={subtotal}
                      handleChangePse={handleChangePse}
                      formValuesPse={formValuesPse}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                />
        }
    }

    return (<>
            {loadingCart && <LoadingOverlay title={"Cargando..."} />}
            {loading && <LoadingOverlay title={"Creando reserva..."} />} 
            <WhatsappButton /> 
            <HeaderStep currentStep={2} />
            <Toaster position="bottom-right"  richColors   />  
            {FillContent()}
            <Footer />
            </>)

}

export default Checkout