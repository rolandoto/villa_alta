import React, { useCallback, useEffect, useState } from "react";
import { DateRange } from 'react-date-range';
import esLocale from 'date-fns/locale/es';
import "./style.css"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Search from "../../Component/Search/Search";
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
import {IconRiCloseLargeLine } from "../../Component/Icons/Icons";
import UseCart from "../../Hooks/UseCart";
import LoadingOverlay from "../../Component/LoadingCreateReserva/LoadingOverlay";
import WhatsappButton from "../../Component/WhatsappButton/WhatsappButton";
import { Environment } from "../../Config/Config";
import { FaUser } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import {  Tag, Coffee, Clock} from 'lucide-react';
import HeaderStep from "../../Component/Header/HeaderStep";
import FooterAccomodation from "../../Component/Footer/FooterAccomodation";
import { Helmet } from "react-helmet";

const Accommodation = () => {

  useEffect(() => {
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
    const [coupon, setCoupon] = useState(); // Estado para el cupón
    const [isVisible, setIsVisible] = useState(true); // Estado para mostrar/ocultar el banner

    const PostHotelByIdHotel = useCallback(async () => {
        setContextMenuPosition(false);
        setContextShowMenuPeople(false)
        await getHotel({propertyID:Environment.propertyID,startDate:formattedStartDate, endDate: formattedEndDate,token:Environment.Token,counPeople:totalCountAdults,promoCode:coupon });
    }, [formattedStartDate,formattedEndDate,totalCountAdults,isVisible]);

    useEffect(() =>{
      PostHotelByIdHotel()
    },[isVisible])

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

    
    const FillContent =()=>{
      if(!formattedStartDate && !formattedEndDate){
        return   <EmpyCart title={" Busca tu reserva en el calendario."} />
      }
      if(loading){
       return  (
                <div  className=" lg:flex    mx-auto   max-w-7xl items-center justify-between p-4 lg:px-8">
                <LoadingSkeleton />
                </div> 
       ) 
      }if(error){
        return    <EmpyCart title={"No tenemos habitaciones disponibles para esta ocupación"} />
                }
        return <> 
                    <div className="p-4 md:pt-0 pt-20">
                      <div className="bg-white border p-8 mb-4 rounded shadow-sm max-w-7xl mx-auto" >
                        <ul className="flex flex-col sm:flex-row sm:justify-between gap-4">
                          <li className="flex items-center gap-2">
                            <Tag size={25} className="text-amber-700" />
                            <span className="text-sm">Descuento exclusivo</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Coffee size={25} className="text-amber-700" />
                            <span className="text-sm">Desayuno incluido</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock size={25} className="text-amber-700" />
                            <span className="text-sm">Check-in anticipado</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock size={25} className="text-amber-700" />
                            <span className="text-sm">Check-out tardío</span>
                          </li>
                      </ul>
                      </div>
                    </div>
                    <div className="gap-5 max-w-7xl m-auto grid md:grid-cols-3 grid-cols-1">
                    {hotel?.data?.map((List,index) => <CardAccomodation  
                                                              counPeople={hotel.counPeople}
                                                              endDate={hotel.endDate}
                                                              validPromotion={hotel.valid}
                                                              startDate={hotel.startDate}
                                                              nightsToday={hotel.nights}
                                                              validCode={hotel.validCode}
                                                              promotion={promotion} 
                                                              totalCountAdults={totalCountAdults}
                                                              key={index} {...List}/>)}
               </div>
        </>
    }
    const monthsToShow = window.innerWidth >= 700 ? 2 : 1;
   
      return (<div  className="bg-[#f6f6f6] h-full  " >
                <Helmet>
                      <title>Habitaciones Hotel villa alta guest house</title>
                      <meta name="description" content="Habitaciones Black Friday - 10% de Descuento en hotel la naval." />
                      <link rel="canonical" href="https://www.villaaltaguesthouse.com/Accomodation" />
                </Helmet>
                <div className="relative  bg-cover bg-center h-full">
                  {isVisible && <div className="fixed top-48 left-0 right-4 flex justify-center z-40">
                      <div className="w-[90%] md:w-full max-w-md bg-black text-white rounded-3xl shadow-lg overflow-hidden flex">
                        <div className="p-4 flex-1">
                          <h2 className="text-sm md:text-base font-bold mb-2">
                            ¡OFERTA EXCLUSIVA SOLO PARA TI! APLICA TU CUPÓN
                          </h2>
                          <input
                            type="text"
                            placeholder="Ingresa tu cupón"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="w-full text-black p-2  rounded-lg mb-2  focus:outline-none focus:ring-2 focus:ring-gray-400"
                          />
                          <button  onClick={() => setIsVisible(false)} className="bg-white w-full text-gray-800 px-4 py-2  text-sm font-semibold hover:bg-gray-200 transition-colors">
                            APLICAR
                          </button>
                        </div>

                        <div className="w-1/2 relative">
                          <img
                            src="https://h-img3.cloudbeds.com/uploads/316944/suite_alcoba_1_featured~~67fe873b3ea83.jpg"
                            alt="Luxury Suite"
                            className="object-cover h-full w-full"
                          />
                          <button
                            onClick={() => setIsVisible(false)}
                            aria-label="Cerrar oferta"
                            className="absolute w-6 h-6 top-2 right-2 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>}

                    <div className="hidden md:block">
                      <HeaderStep currentStep={1} />
                    </div>
                    <Toaster position="bottom-right"  richColors   />
                    {loadingCart && <LoadingOverlay title={"Cargando..."} />}
                    <WhatsappButton />
                    {subtotal >0 &&<Cart    
                                    checkbxo={checkbox} 
                                    handClickCart={handClickCart} /> } 
                    <div className="p-2 lg:px-8 md:flex hidden " >
                    <CalenderSearch  HandClickMenuPeople={HandClickMenuPeople} 
                                    formattedStartDateToString={formattedStartDateToString}
                                    formattedEndDateToString={formattedEndDateToString}
                                    HandClickMenuEnd={HandClickMenuEnd}
                                    HandClickMenu={HandClickMenu}
                                    onsubmit={PostHotelByIdHotel} 
                                    totalCountAdults={totalCountAdults}
                                    />
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
                        <div className="w-full p-4  animation z-40 lg:hidden bg-white fixed top-[0px]   shadow-md ">
                          <div className="flex items-center justify-between text-gray-700 ">
                            <div className="flex items-center" onClick={HandClickMenu}>
                              <SlCalender fontSize={20}  className="mr-2" />
                              <span className="font-bold" >{formattedStart === 'fecha inválida' ? '-- / -- / --' : formattedStart}→ {formattedEnd === 'fecha inválida' ? '-- / -- / --' : formattedEnd}</span>
                            </div>
                            <div className="flex items-center " onClick={HandClickMenuPeople}>
                              <FaUser fontSize={15}  color="black"/>
                              <span className="" >{adults} huésped</span>
                            </div>
                            <div className="flex items-center bg-[#a39672] rounded-sm  justify-center   lg:text-[15px]  text-[12px]  cursor-pointer z-40 lg:w-[250px] 
                              w-[80px] text-white lg:py-4 py-2    hover:bg-[ff7a45px] transition duration-200 " onClick={PostHotelByIdHotel}>
                              <span className="" >Reservar</span>
                              <FiArrowRight fontSize={15}/>
                            </div>
                          </div>
                        </div>
                        <div >
                        {FillContent()}
                        </div>
                </div>   
                <FooterAccomodation /> 
            </div>
    );
}

export default Accommodation;
