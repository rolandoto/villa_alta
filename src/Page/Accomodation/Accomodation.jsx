import React, { useCallback, useEffect, useState } from "react";
import { DateRange } from 'react-date-range';
import esLocale from 'date-fns/locale/es';
import "./style.css"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Search from "../../Component/Search/Search";
import {  MainProduct, SectionSearch} from "../../Ui/Style/GeneralStyle";
import CardAccomodation from "../../Component/CardAccomodation/CardAccomodation";
import CalenderSearch from "../../Component/CalenderSearch/CalenderSearch";
import UseHotelActions from "../../Actions/useHotelsActions";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import moment from "moment";
import LoadingSkeleton from "../../Component/LoadingSkeleton/LoadingSkeleton";
import UseCalenderSearch from "../../Hooks/UseCalenderSearch";
import { SlCalender } from "react-icons/sl";
import EmpyCart from "../../Component/EmpyCart/EmpyCart";
import Cart from "../../Component/Cart/Cart";
import { IconFaUser, IconRiCloseLargeLine } from "../../Component/Icons/Icons";
import UseCart from "../../Hooks/UseCart";
import LoadingOverlay from "../../Component/LoadingCreateReserva/LoadingOverlay";
import HeaderAccomodation from "../../Component/HeaderAccomodation/HeaderAccomodation";
import Footer from "../../Component/Footer/Footer";
import useRoomsPromotions from "../../Actions/useRoomsPromotions";
import WhatsappButton from "../../Component/WhatsappButton/WhatsappButton";
import { Environment } from "../../Config/Config";
import { Link } from "react-router-dom";
import Header from "../../Component/Header/Header";
import { FaUser } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";


const Accommodation = () => {

  useEffect(() => {
    // Scrolls to the top of the document on component mount
    window.scrollTo(0, 0);
}, []);

  const {getHotel} = UseHotelActions()
  const [contextShowMenuPeople, setContextShowMenuPeople] = useState(false);
  const {error,hotel,loading}= useSelector((state) => state.Hotel)
  const {loadingCart} = useSelector(state => state.Cart);
  const {handleSelect,state,setContextMenuPosition,contextMenuPosition,
    handChangeAdults,
    handChangeChildrem,
    handDecreaseAdults,
    handDecreaseChildren,
    totalCountAdults,
    adults,
    childrem ,
    getClassNameForDate} =  UseCalenderSearch()


    const [promotion,setPromotions] =useState(false)
    const [visible, setVisible] = useState(false);
      

    const handSubmitCupon =() =>{
      setPromotions(true)
      setVisible(false)
    }

    const {getCartSubtotal} = UseCart()
    const subtotal = getCartSubtotal()
    const [checkbox,setCheckBox] =useState(false)
    const startDate = state[0]?.startDate;
    const endDate = state[0]?.endDate;
    const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD') : '';
    const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : '';
    const formattedStartDateToString = moment(state[0]?.startDate).format('DD MMM YYYY').toLowerCase();
    const formattedEndDateToString = moment(state[0]?.endDate).format('DD MMM YYYY').toLowerCase();


    const formattedEnd = moment(state[0]?.endDate).format('DD MMM').toLowerCase();
    const formattedStart = moment(state[0]?.startDate).format('DD MMM').toLowerCase();


    const [scrolledbook, setScrolledBook] = useState(false);
    
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
        
        } if(window.scrollY > 200){
          setScrolledBook(true)
        } else {
        
          setScrolledBook(false)
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);



    const PostHotelByIdHotel = useCallback(async () => {
        setContextMenuPosition(false);
        setContextShowMenuPeople(false)
        await getHotel({propertyID:Environment.propertyID,startDate:formattedStartDate, endDate: formattedEndDate,token:Environment.Token,counPeople:totalCountAdults });
    }, [formattedStartDate,formattedEndDate,totalCountAdults]);

    useEffect(() =>{
      PostHotelByIdHotel()
    },[])

    const HandClickMenuPeople =() =>{
      if(contextShowMenuPeople){
        setContextShowMenuPeople(false)
      }else if(!contextShowMenuPeople){
        setContextShowMenuPeople(true)
      }
      setContextMenuPosition(false)
    }

    const HandClickMenu =() =>{
      if(contextMenuPosition){
        setContextMenuPosition(false)
      }else if(!contextMenuPosition){
        setContextMenuPosition(true)
      }
      setContextShowMenuPeople(false)
    }
    
    const handClickCart =() =>{
      setCheckBox(!checkbox)
   }

    const HandClickMenuEnd =() =>{
      if(contextMenuPosition){
        setContextMenuPosition(false)
      }else if(!contextMenuPosition){
        setContextMenuPosition(true)
      }
      setContextShowMenuPeople(false)
    }

    const {RoomsGetPromotions,loadingGetRoomsProtions,errorGetRoomsProtions}= useSelector((state) => state.RoomsPromotios)
  
    const  {GetRoomsPromotions} = useRoomsPromotions()
  
    const FetchDate =async() =>{
          await GetRoomsPromotions({id:4})
    }


    useEffect(() =>{
      FetchDate ()
    },[])
   
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 5000); // 10000 ms = 10 segundos
  
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }, []);
    

    const isTodaySelected = () => {
      const todayIndex = moment().format('d'); // Obtiene el nombre completo del día actual
      return RoomsGetPromotions.some(day => day.day_number === todayIndex); // Verifica si el nombre del día actual está en activeDays
    };

    const isTodaypromotions =isTodaySelected()
    
    const FillContentPromotions =()=>{

      if(loadingGetRoomsProtions){
       return  (
                <div  className=" lg:flex    mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
                <LoadingSkeleton />
                </div> 
       ) 
      }if(errorGetRoomsProtions){
        return   <p>...eror al cargar</p>
                }
        return <>{visible &&
          
          isTodaypromotions && (
          <div className="fixed right-4  left-0 w-full m-auto h-[190px] top-44 z-40 text-white flex rounded-lg overflow-hidden shadow-lg max-w-md">

              <div className="p-4  flex-1 bg-gray-700">
                <h2 className="text-[15px] font-bold mb-2">¡OFERTA EXCLUSIVA SOLO PARA TI!</h2>
                <p className="text-sm mb-3">
                  Reserva una de nuestras  comidas habitaciónes y unten un 10% de descuento
                </p>
                <button  onClick={handSubmitCupon}  className="bg-white w-[200px] md:w-[200px]  text-gray-800 px-4 py-1 rounded text-sm font-semibold hover:bg-gray-200 transition-colors">
                  APLICAR DESCUENTO
                </button>
              </div>
              <div className="w-1/2 relative">
                <img 
                  src="https://grupo-hoteles.com/storage/app/6/rooms/206865655-14-rooms-slider-3-hotel-cartagena-dc-economico-habitacion-clasica-seleccion.webp" 
                  alt="Luxury Suite" 
                  className="object-cover h-[190px] w-full"
                />
                <button onClick={() => setVisible(false)} className="absolute  w-6 h-6  top-1 right-1 text-white bg-gray-800 rounded-full flex items-center justify-center">
                  ×
                </button>
            </div>
          </div>
      )}</>
    }
    const [dates, setDates] = useState('');
    const [rooms, setRooms] = useState(1);
    const [guests, setGuests] = useState(1);
    const [promoCode, setPromoCode] = useState('');
  
    
    const FillContent =()=>{
      if(!formattedStartDate && !formattedEndDate){
        return   <EmpyCart title={" Busca tu reserva en el calendario."} />
      }
      if(loading){
       return  (
                <div  className=" lg:flex    mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
                <LoadingSkeleton />
                </div> 
       ) 
      }if(error){
        return    <EmpyCart title={"No tenemos habitaciones disponibles para esta ocupación"} />
                }
        return <> 
        
        <div className="p-4  rounded-[40px]   bg-[#3f6969]  m-auto max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl text-white font-bold">Medellín, Colombia</h1>
                        <p className="text-white">Mostrando {hotel?.data?.length} Tipo de habitaciones</p>
                      </div>
                     
                    </div>
        
         {hotel?.data?.map((List,index) => <CardAccomodation  
                                                              counPeople={hotel.counPeople}
                                                              endDate={hotel.endDate}
                                                              startDate={hotel.startDate}
                                                              nightsToday={hotel.nights}
                                                              promotion={promotion} 
                                                              totalCountAdults={totalCountAdults}
                                                              key={index} {...List}/>)}</>
    }
    const monthsToShow = window.innerWidth >= 700 ? 2 : 1;


    return (<div  className="" >
      <div
            className="relative  bg-cover bg-center h-full"
            style={{
              backgroundAttachment:"fixed",
              backgroundImage: "url('https://github.com/rolandoto/image-pms/blob/main/MG_8648-scaled.jpg?raw=true')", // aquí pones la ruta de la imagen
            }}
          >
            <Header/>
            <Toaster position="bottom-right"  richColors   />
            {loadingCart && <LoadingOverlay title={"Cargando..."} />}
            <WhatsappButton />
            {subtotal >0 &&<Cart    
                            checkbxo={checkbox} 
                            handClickCart={handClickCart} /> } 
          
          
  
          <div className="p-2 lg:px-8" >
            <CalenderSearch  HandClickMenuPeople={HandClickMenuPeople} 
                            formattedStartDateToString={formattedStartDateToString}
                            formattedEndDateToString={formattedEndDateToString}
                            HandClickMenuEnd={HandClickMenuEnd}
                            HandClickMenu={HandClickMenu}
                            onsubmit={PostHotelByIdHotel} 
                            totalCountAdults={totalCountAdults}
                            />
          </div>
          <div className=" lg:flex hidden p-2 lg:px-8" >
              <MainProduct className="m-auto flex ">
                <div className="flex lg:w-[47%] w-[100%] justify-center bg-[#3f6969] rounded-[40px]  p-4  items-center space-x-1">
                  <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <span className=" text-white">Elegir un espacio
                  </span>
                </div>
                <div className=" flex  border-confirme  p-4 items-center space-x-1">
                  <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  <span className="text-gray-700">Confirmación</span>
                </div>
              </MainProduct>
            </div>

        

            <div className="lg:hidden flex  p-2 lg:px-8" >
              <MainProduct className="m-auto ">
                <div className="flex lg:w-[47%] w-[100%] justify-center bg-[#3f6969] rounded-[40px]  p-4  items-center space-x-1">
                  <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <span className=" text-white">Elegir un espacio
                  </span>
                </div>
               
              </MainProduct>
            </div>

          <div className="hidden lg:block  ">
              {contextMenuPosition && (
                <DateRange
                  className="flex calender-search-Acoomodation lg:hidden"
                  rangeColors={["rgb(255 104 0 / 36%);"]}
                  minDate={new Date()}
                  onChange={handleSelect}
                 
                  months={2}
                  dayContentRenderer={(date) => {
                    const className = getClassNameForDate(date);
                 
                    return (
                      <div className={className}>
                        {date.getDate()}
                      </div>
                    );
                  }}
                  autoFocus
                  moveRangeOnFirstSelection={false} // No mueve el rango en la primera selección
                  showSelectionPreview={false} // Muestra la selección previa
                  startDatePlaceholder="Early"
                  showDateDisplay={false}
                  ranges={state}
                  direction="horizontal"
                  locale={esLocale}
                />
              )}
          </div>
          {contextMenuPosition &&
              <div className="  lg:hidden fixed inset-0 bg-white flex items-start justify-center z-50  md:shadow-[17px_20px_40px_rgba(0,0,0,0.21)] md:rounded-[1.25rem] md:!font-size[16px] md:!user-select-none">
                <div className="bg-white p-4  rounded-lg shadow-lg w-full h-full md:w-auto md:h-auto">
                  <button className="absolute top-4 right-4 text-black text-lg" onClick={() =>setContextMenuPosition(false)} ><IconRiCloseLargeLine />;</button>
                 <div>
                    <h2 className="text-center text-2xl font-semibold mb-4">Selecionar fecha</h2>
                    <DateRange 
                          className="flex calender-search-Acoomodation lg:hidden"
                          rangeColors={["rgb(255 104 0 / 36%);"]}
                          minDate={new Date()}
                          onChange={handleSelect}
                          editableDateInputs={false}
                          months={monthsToShow}
                          dayContentRenderer={(date) => {
                            const className = getClassNameForDate(date);
                            return (
                              <div className={className}>
                                {date.getDate()}
                              </div>
                            );
                          }}
                          autoFocus
                          moveRangeOnFirstSelection={false} // No mueve el rango en la primera selección
                          showSelectionPreview={false} // Muestra la selección previa
                          startDatePlaceholder="Early"
                          showDateDisplay={false}
                          ranges={state}
                          direction="horizontal"
                          locale={esLocale}
                      />
                     <button
                      className="mt-6 bg-black text-white px-6 py-3 rounded-lg "
                      onClick={(e) => setContextMenuPosition(false) }
                      style={{
                        position: 'absolute',
                        bottom: '20px',  // Ajusta esta propiedad según la distancia que desees del borde inferior
                        left: '50%',     // Centra el botón horizontalmente
                        transform: 'translateX(-50%)', // Ajusta la posición centrada
                      }}
                    >
                      Continuar
                    </button>
                    </div>
                 </div> 
            </div>} 
                   
             {contextShowMenuPeople &&
              <div className=" lg:hidden fixed inset-0 bg-white flex items-start justify-center z-50   md:rounded-[1.25rem] md:!font-size[16px] md:!user-select-none">
                <div className="bg-white p-4   rounded-lg  w-full h-full md:w-auto md:h-auto">
                  <button className="absolute top-4 right-4 text-black text-lg" onClick={() =>setContextShowMenuPeople(false)} ><IconRiCloseLargeLine /></button>
                        <div>
                              <h2 className="text-center text-2xl font-semibold mb-4">Selecionar adultos</h2>
                              <Search contextShowMenuPeople={contextShowMenuPeople}
                              top={715}
                              adults={adults}
                              childrem={childrem}
                              handChangeAdults={handChangeAdults}
                              handDecreaseAdults={handDecreaseAdults}
                              handChangeChildrem={handChangeChildrem}
                              handDecreaseChildren={handDecreaseChildren}
                              setContextShowMenuPeople={setContextShowMenuPeople}  />
                      </div>
                  </div> 
              </div>} 
                <div className="hidden lg:block  ">
                    {contextShowMenuPeople && 
                      <Search contextShowMenuPeople={contextShowMenuPeople}
                      top={190}
                      adults={adults}
                      childrem={childrem}
                      handChangeAdults={handChangeAdults}
                      handDecreaseAdults={handDecreaseAdults}
                      handChangeChildrem={handChangeChildrem}
                      handDecreaseChildren={handDecreaseChildren}
                      setContextShowMenuPeople={setContextShowMenuPeople}  />}
                </div>  


              {scrolledbook && (
                <div className="w-full  animation z-40 lg:hidden bg-white fixed top-[50px] p-4  shadow-md ">
                  <div className="flex items-center justify-between text-gray-700 ">
                    <div className="flex items-center" onClick={HandClickMenu}>
                      <SlCalender fontSize={20}  className="mr-2" />
                      <span className="font-bold" >{formattedStart === 'fecha inválida' ? '-- / -- / --' : formattedStart}→ {formattedEnd === 'fecha inválida' ? '-- / -- / --' : formattedEnd}</span>
                    </div>
                    <div className="flex items-center " onClick={HandClickMenuPeople}>
                      <FaUser fontSize={15}  color="black"/>
                      <span className="" >4 huésped</span>
                    </div>
                    <div className="flex items-center bg-black  justify-center   lg:text-[15px]  text-[12px]  cursor-pointer z-40 lg:w-[250px] 
                      w-[80px] text-white lg:py-4 py-2    rounded-full hover:bg-[ff7a45px] transition duration-200 " onClick={PostHotelByIdHotel}>
                      <span className="" >Reservar</span>
                      <FiArrowRight fontSize={15}/>
                    </div>
                  </div>
                </div>
                 )}
                <div >
                
                <div className="p-2">
                    {FillContentPromotions()}
                  </div>
                
                    {FillContent()}
                    
                </div>
                <div className="  p-2 lg:px-8" >
                  <MainProduct className="m-auto   p-8">
                        <h1 className="text-sm font-bold ">TÉRMINOS Y CONDICIONES - CONTRATO DE HOSPEDAJE  </h1>
                        <section className=""> 
                          <p className="text-justify">
                        

                            1. Conforme a los artículos 79 y 81 de la Ley 300 de 1996, la Tarjeta de Registro Hotelero es prueba de la celebración del contrato de hospedaje entre el HOTEL y el HUÉSPED. El contrato es aceptado por la firma del HUÉSPED. El presente
                            contrato es de adhesión, por tal motivo el HUÉSPED se adhiere a las estipulaciones aquí contenidas. 2. El HUÉSPED conoce y acepta la conformidad del tipo de habitación, la tarifa cobrada por el servicio de hospedaje así como las fechas de
                            llegada y de salida consignadas en la Tarjeta de Registro Hotelero. La hora para efectuar el check in es a partir de las 15:00 horas y para efectuar el checkout es hasta las 13:00 horas y que el ingreso temprano (early check in) o salida tarde
                            (late check out) podrá generar costos adicionales. El ingreso anticipado o la salida con posterioridad a la hora indicada estará sujeta a disponibilidad y el HUÉSPED deberá pagar el valor correspondiente que tenga establecido el hotel. 3.
                            PRECIO. La habitación y el precio o tarifa por noche será la que se indique en la Tarjeta de Registro Hotelero y que corresponde a la reserva. 3.1.- El precio del hospedaje corresponde al canon por noche que el HUÉSPED se obliga a pagar y
                            que asciende a la suma que se indica en la Tarjeta de Registro Hotelero y corresponde a la reserva efectuada. 3.2.- El HUÉSPED deberá pagar también todos los cargos por concepto de alimentos, bebidas, lavandería y en general por todos
                            aquellos que se generen durante su estadía y que decida cargar a su cuenta. 3.3.- El HUÉSPED declara que ha sido informado de las tarifas, cánones y en general precios de las habitaciones por noche. 3.4.- El incumplimiento del pago
                            acordado generará a cargo del HUÉSPED intereses de mora a la tasa máxima permitida, conforme al articulo 884 del código de comercio. 3.5.- El HUÉSPED, sus acompañantes y las agencia de viajes son solidariamente responsables
                            conforme al articulo 81 de la Ley 300 de1996. 3.6. El pago podrá ser exigido por adelantado y/o de manera parcial, a juicio del HOTEL. El HUÉSPED podrá garantizar el pago al hotel mediante la firma de un pagare o voucher de alguna tarjeta
                            de crédito aceptada por el HOTEL. 3.7. El HUÉSPED autoriza el envió de la factura al correo electrónico informado. 3.8. El HUÉSPED conoce y acepta la tarifa del hospedaje deberá ser prepagada y los consumos adicionales garantizados
                            (tarjeta de crédito o depósito). En caso que la garantía sea tarjeta de crédito, autorizo eldiligenciamiento del voucher y su presentación ante la respectiva entidad bancaria.4. OBLIGACIONES DEL HUÉSPED. 4.1.- Identificarse para registrarse
                            en el HOTEL con documento de identidad idóneo, presentando su cédula de ciudadanía en caso de ser colombiano o su pasaporte o documento aplicable tratándose de extranjeros. Para menores de edad, deberá presentarse documento
                            de identificación válido. 4.2.-Pagar el valor del hospedaje más los impuestos correspondientes. 4.3.- Pagar el valor de todos los consumos y cargos que haya hecho a su cuenta. 4.4.- Observar una conducta decorosa y vestir de manera
                            apropiada. 4.5.-Responder hasta la culpa leve de sus obligaciones y las de sus acompañantes o invitados. 4.6.- Registrar en la recepción del hotel a todos los acompañantes o invitados del HUÉSPED que se dirijan a su habitación y pagar
                            elcanon o valor correspondiente por cada uno de ellos. 4.7.- Respetar el número de personas por habitación. 4.8.- Utilizar los muebles, enseres, equipos, tarjetas o llaves asignadas para abrir la habitacion y en general las facilidades tanto de
                            la habitación como del HOTEL, de manera adecuada conservándolas en el estado en que se encuentren y por tanto responderá por cualquier daño o pérdida de los elementos y bienes del HOTEL, hasta por la culpa leve. En caso de pérdida o
                            daño total o parcial de los bienes del HOTEL por causa atribuible al HUÉSPED o a sus acompañantes, el HUÉSPED deberá pagar el precio correspondiente a su reparación o reposición, según el caso. 4.10.- Permitir el derecho de inspección
                            y/o vigilancia a la habitación por parte de funcionarios del HOTEL. Este derecho se ejercerá de manera razonable e incluye la facultad depenetrar o registrar la habitación cuando a juicio del Gerente del HOTEL sea preciso. 4.12.- Permitir a los
                            empleados y funcionarios del HOTEL el acceso para labores de rutina y limpieza de la habitación.5. TERMINACIÓN DEL CONTRATO. El contrato de hospedaje terminará por: 5.1- Por vencimiento del plazo pactado. 5.2.- Por incumplimiento de
                            cualquiera de las obligaciones a cargo de las partes y puntualmente por el incumplimiento del pago del precio o canon a cargo del HUÉSPED o por incumplimiento del pago de los alimentos y bebidas o demás servicios complementarios que
                            el HUÉSPED hubiera cargado a la habitación o a su cuenta personal. 5.3.- En los eventos en que, a juicio exclusivo del HOTEL, el comportamiento o la indumentaria del HUÉSPED atente contra la tranquilidad y/o salubridad de los demás
                            huéspedes o de los visitantes del HOTEL. 5.4.- Por fumar en la habitación o en cualquier otro espacio libre de humo del hotel, cuando se afecten otros huéspedes, visitantes o usuarios y sin perjuicio del pago que deberá hacer en los
                            términos que se establecen más adelante. Parágrafo: La terminación del contrato no exonera ni libera al HUÉSPED del pago delos saldos pendientes.6. EFECTOS DE LA TERMINACIÓN. 6.1.- A la terminación del contrato el HOTEL podrá
                            disponer libremente de la habitación. 6.2.- A la terminación del contrato y con independencia de la causa de terminación, el HOTEL queda facultado para ingresar a la habitación, elaborar y suscribir un inventario de los efectos y equipaje del
                            huésped y retirarlos de la habitación para dejarlos en depósito seguro y adecuado, sin responsabilidad del HOTEL y por cuenta y riesgo del HUÉSPED. 6.3.- Si el HUÉSPED no pagaré la cuenta o parte de ella, el HOTEL podrá disponer y vender
                            el equipaje y objetos del HUÉSPED y sus acompañantes en los términos del artículo 1199 del Códigode Comercio, para cubrir con su producto las obligaciones pendientes. El excedente si lo hubiere, será puesto adisposición del HUÉSPED. En
                            caso de déficit, el HOTEL podrá iniciar las acciones correspondientes paraconseguir el pago total de la suma adeudada.7. CUSTODIA DE DINERO Y OBJETOS DE VALOR. El HUÉSPED conoce y acepta la exclusión de responsabilidad del
                            establecimiento hotelero por la perdida o sustracción de los bienes que no sea entregados al hotel a titulode depósito o guardados con las debidas medidas de seguridad. Conforme al artículo 1195 del Código deComercio, los HUÉSPEDES
                            podrán entregar bajo recibo al HOTEL dinero y objetos de valor para su custodia. Laentrega deberá hacerse ante el funcionario designado por el HOTEL y deberá levantarse un acta donde serelacione el dinero o los objetos entregados. La
                            responsabilidad del HOTEL será la del depositario, en lostérminos del artículo 1196 del Código de Comercio. Los objetos de valor como joyas, cámaras, dinero,computadores, celulares, equipos o utensilios que permanezcan en la habitación
                            o áreas de servicios diferentesa las que el HOTEL dispone para depósito, estarán bajo el único riesgo del HUÉSPED ya que en este caso elHOTEL no asume responsabilidad alguna, en caso de pérdida o deterioro.8. El HUÉSPED conoce y
                            acepta las medidas políticas comerciales y de seguridad establecidas por el HOTEL parael ingreso de visitantes y huéspedes adicionales. EL HUÉSPED conoce y acepta que el ingreso de personas ohuéspedes adicionales genera y causa el
                            cobro de tarifas de hospedaje por dichos huéspedes que no fueronincluidos en la reserva. El HOTEL se reserva el derecho de admitir el ingreso de huéspedes adicionales oacompañantes a su simple discrecionalidad. Se debe demostrar por
                            cualquier medio probatorio idóneo elparentesco con el menor (es) cuando el (los) hagan uso de la misma habitación asignada. Todo menor de edaddebe hospedarse en compañía de los padres y portar sus respectivos documentos de
                            identificación. En caso deno estar en compañía de sus padres, podrá ser realizado por el familiar mayor de edad responsable del menor,debidamente autorizado por al menos uno de los padres. La autorización deberá constar por escrito
                            firmado ynotariado por uno de los padres e indicar que el menor se encuentra bajo su cuidado. El HOTEL rechaza y nopermite la explotación sexual ni cualquier forma de abuso sexual. El HOTEL rechaza y no permite el turismosexual ni
                            permite la explotación ni el abuso sexual de niñas, niños ni adolecentes. El HUÉSPED no podráingresar a su habitación menores de dieciocho (18) años de edad para el turismo sexual y quien lo hagaincurrirá en las sanciones penales que
                            consagre la ley colombiana.9. El establecimiento hotelero se reserva el derecho de prorrogar el presente contrato de hospedaje a sufinalización.10.El HUÉSPED acepta que la suma liquida de dinero que conste en la factura prestara merito
                            ejecutivo.11.El HUÉSPED conoce que la tarifa del hospedaje deberá ser prepagada y los consumos adicionales garantizadosmediante tarjeta de crédito o depósito. En caso que la garantía sea tarjeta de crédito, el HUÉSPED autoriza
                            eldiligenciamiento del voucher y su presentación ante la respectiva entidad bancaria.12.Salvo los casos expresamente regulados por la Ley, el HOTEL se reserva el derecho de ingreso de mascotas asus instalaciones. No se admiten mascotas
                            y su incumplimiento podrá dar lugar a la terminación del contrato ya la imposición de multas establecidas en el contrato.13.El HOTEL es 100% libre de humo. La falta a esta regla esta sancionada por la ley colombiana y suincumplimiento
                            podrá dar lugar a la terminación del contrato y a la imposición de multas establecidas en el en el hotel.14.El HUÉSPED conoce y acepta ser trasladado a utilizar otro hotel de características similares cuando en el hotelno haya disponibilidad
                            inmediata.15.Cualquier afectación que haga el HUÉSPED y sus acompañantes al mobiliario del hotel e infraestructura,deberá ser asumida y pagada a los costos valorizados de estas afectaciones.16.Conforme a la Ley 1336 de 2009 y su
                            reglamento que regula la materia, se combate y rechaza cualquier forma, método o procedimiento que implique o conlleve a la explotación sexual y/o pornográfica de niños, niñas yadolescentes, y en tal virtud de tener conocimiento de la
                            mera intención de llevar a cabo tales actividadesdentro de las instalaciones del hotel, procederá a informarlo a las autoridades competentes.17.Conforme a los establecido en la Ley 17 de 1981 y sus reglamentarios combate toda forma de
                            comercialización y trafico de fauna y flora así como el trafico ilícito de bienes. El HOTEL promueve el cumplimiento de la resolución 572 de 2005 y demás normas de conservación de Flora y Fauna así como la conservación delpatrimonio
                            cultural y de los bienes de interés cultural y contribuye y promueve el cumplimiento de la ley 397de 1997 y demás normas aplicables. El HOTEL rechaza cualquier forma de discriminación, distinción, exclusión, restricción o preferencia por
                            motivos de género, raza, color, origen nacional o étnico, religión, opinión político opor cualquier otro motivo o condición que tenga como propósito o que produzca como efecto deteriorar, restringir o limitar el goce completo de los derechos
                            y libertades fundamentales.18. <span className="font-bold" > TÉRMINOS Y CONDICIONES DE CANCELACIÓN Y POLÍTICAS DE DEVOLUCIONES</span>. El HUÉSPED puede ejercerderecho al retracto únicamente en compras no presenciales realizadas a través de portales web o en la
                            central de reservas telefónica. La solicitud debe realizarla en máximo cinco (5) días hábiles posteriores a la confirmación de la compra. Si la fecha de ingreso es antes de los cinco días, no procederá el derecho al retracto y en caso de
                            cancelación se aplicaran las condiciones de cancelación y devolución y que son: - Si la cancelación de la reserva se realiza de 8 o mas días antes de la fecha de check in, se realizará una devolución del 80% correspondiente al valor
                            depositado. – Si la cancelación de la reserva se realiza dentro de 8 a 3 días antes del check in se cobrara el 50% del valor depositado. – Si la cancelación de la reserva se realiza dentro de las 48 horas antes del check in se cobrara la totalidad
                            del valor depositado. - En caso que estando alojado tenga una salida anticipada y se haya realizado el pago total del alojamiento, tendrá un saldo a favor que podrá utilizar en cualquier establecimiento en convenios con el hotel, que deberá
                            redimirse en 1 año. Una vez recibida la solicitud si se aplica devolucion con base a las politicas establecidas por el hotel, te reintegraremos el valor de devolución en un término máximo de 30 días calendarios contados apartir de tu solicitud.
                            Lo realizaremos mediante consignación bancaria al titular de la reserva 19.MULTAS. Fumar en la habitación o en cualquier otro espacio del hotel constituye un incumplimiento grave delcontrato de hospedaje que da lugar a su terminación y
                            podrá ser retirado del HOTEL si ha afectado a otroshuéspedes, visitantes o usuarios. Si el HUÉSPED fuma en la habitación, por cada día que lo haga deberá pagar(i) el costo en el que debe incurrir el HOTEL para desodorizar y limpiar la
                            habitación, que se estima en una suma equivalente a $200.000 cop, y (ii) el valor de (2) noches a la tarifa correspondiente a su alojamiento, como quiera que el proceso de limpieza y desodorización implica que el HOTEL no pueda utilizar la
                            habitación durante las siguientes dos (2) noches. Sifuma en cualquier área del hotel distinta de la habitación, deberá pagar el costo en que debe incurrir el HOTELpara desodorizar y limpiar el área en la que haya fumado, que equivale a
                            $200.000 cop. El ingreso de mascotas se sancionara con multa de $ 200.000 cop por cada noche o ingreso de mascota no autorizada.20.El HUÉSPED conforme con lo establecido en la Ley 1581 de 2012 y sus reglamentarias, AUTORIZA
                            irrevocablemente al HOTEL, sus titulares y operadores para recolectar, usar y tratar los datos personales suministrados por el HUÉSPED en la Tarjeta de Registro Hotelero con fines comerciales y de conformidad con las políticas de
                            tratamiento de datos personales. El HUÉSPED autoriza la consulta y reporte ante centrales de riesgo de información sobre el cumplimiento de las obligaciones y/o pago de los servicios de hospedajes u hoteleros. El HUÉSPED, en su condición
                            de titular de los datos personales, gozará de todos los derechos de ley yen particular tendrá derecho a conocer, acceder, actualizar y rectificar sus datos personales, revocar la autorización concedida o solicitar la supresión de información
                            cuando ello sea procedente. El HUÉSPED autoriza expresamente al HOTEL y sus operadores, para recolectar y utilizar la información y los datos personales suministrados por elHUÉSPED en la Tarjeta de Registro Hotelero tales como nombre,
                            dirección, identificación, nacionalidad, fechade nacimiento, dirección de correo electrónico, número de teléfono fijo y móvil o celular, preferencias eintereses personales, trabajo o actividad, de conformidad con las políticas de tratamiento
                            seguro de la información establecidas por el propio Hotel y por las leyes vigentes con el propósito de consultar y reportarante centrales de riesgo como PROCREDITO y DATACREDITO sobre el incumplimiento de obligaciones y/opago de los
                            servicios de hospedajes u hoteleros, realizar actividades de fidelización y contactar al titular de la información para enviarle encuestas de servicios luego de cada estadía que permitan la calificación del servicio prestado, y comunicarle las
                            invitaciones, ofertas, promociones, portafolio de servicios o información general que este dirigida a que siga haciendo uso del Hotel o de otros hoteles afiliados y a ofrecerle los servicios correspondientes. El HUÉSPED autoriza que la
                            información sea transferida, transmitida, compartida y suministrada al HOTEL, exclusivamente para los propósitos descritos previamente. El HUÉSPED, en su condición de titular de los datos personales, gozará de todos los derechos de ley,
                            de los expresamente descritos en el artículo 8 de la Ley 1581 de 2012 y en particular tendrá derecho en todo momento a conocer, acceder, actualizar y rectificar sus datos personales, revocar la autorización concedida o solicitar la supresión
                            de información cuando ello sea procedente. Autorizo también para que “la notificación” a que hace referencia el decreto 2952 del 06 de agosto de 2010 en su artículo 2°, se pueda surtir a través de mensaje de datos al correo electrónico
                            informado en Tarjeta de Registro Hotelero.21. El HOTEL, su titular y/o su operador.
                          </p>
                        </section>
                      </MainProduct>
                      </div>
                      </div>    
            </div>
    );
}

export default Accommodation;
