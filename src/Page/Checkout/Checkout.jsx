import React, {useEffect, useState} from 'react';
import Header from "../../Component/Header/Header"
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
import HeaderCheckout from '../../Component/HeaderCheckout/HeaderCheckout';
import FormCheckout from '../../Component/FormCheckout/FormCheckout';
import Footer from '../../Component/Footer/Footer';
import ConfirmationMessage from '../../Component/ConfirmationMessage/ConfirmationMessage';
import WhatsappButton from '../../Component/WhatsappButton/WhatsappButton';
import { Environment } from '../../Config/Config';
import { Link } from 'react-router-dom';
import { MainProduct, SectionSearch } from '../../Ui/Style/GeneralStyle';
import SearchGlobal from '../../Component/SearchGlobal/SearchGlobal';

const Checkout  =() =>{
    useFetchData();

    useEffect(() => {
        // Scrolls to the top of the document on component mount
        window.scrollTo(0, 0);
    }, []);
    const [formErrors, setFormErrors] = useState({});
    const [formValues, handleChange] = useFormValues();
    const {cart,getCartSubtotal} = UseCart()
    const subtotal = getCartSubtotal()
    const {PostCreateHotel} =useReservationCreate()
    const {Country,loading,reservation}= useSelector(state => state.Reservation);
    const {loadingCart} = useSelector(state => state.Cart);
    const cardNumberArray = formValues.cardNumber.split(" ");
    const cardNumberString = cardNumberArray.join("");
    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(cart)

    const validate = useValidation();

    const Rooms = cart.map(item => ({
        "roomTypeID": item.roomTypeID,
        "quantity": item.quantity
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
        price: item?.Price
    }));

   
    const subtotalPayment =  night[0]?.price
    const StartDate = night[0]?.startDate
    const EndDate = night[0]?.endDate

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
        await PostCreateHotel({ propertyID:Environment.propertyID,
                                token:Environment.Token,
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
    
    };



    /*const togglePanel = () => {
      setIsOpen(!isOpen);
    };
*/


const [menuOpen, setMenuOpen] = useState(false);


    const FillContent =() =>{

        if(Boolean(reservation)){
            return ( <ConfirmationMessage title={"Tu reserva ha sido creada"} />)
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
                />
        }
    }

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);



    return (<>
    {loadingCart && <LoadingOverlay title={"Cargando..."} />}
    {loading && <LoadingOverlay title={"Creando reserva..."} />}  
    
    <Header/>

        <div className="p-2 lg:px-8">
        <SearchGlobal />
        </div>
        <div className=" lg:flex hidden p-2 lg:px-8" >
                <MainProduct className="m-auto flex ">
                    <div className="flex lg:w-[47%] w-[100%] justify-center bg-white rounded-[40px]  p-4  items-center space-x-1">
                    <span className=" bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    <span className=" text-black">Elegir un espacio
                    </span>
                    </div>
                    <div className=" flex  border-confirme  bg-[#3f6969] p-4 items-center space-x-1">
                    <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    <span className="text-white">Confirmación</span>
                    </div>
                </MainProduct>
                </div>

                <div className="lg:hidden flex  p-2 lg:px-8" >
                <MainProduct className="m-auto ">
                    <div className="flex lg:w-[47%] w-[100%] justify-center bg-[#3f6969] rounded-[40px]  p-4  items-center space-x-1">
                    <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    <span className=" text-white">Confirmación
                    </span>
                    </div>
                </MainProduct>
            </div>

        
            <WhatsappButton />
            
            <Toaster position="bottom-right"  richColors   />  
                {FillContent()}

          
            </>)

}

export default Checkout