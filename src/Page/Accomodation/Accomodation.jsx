import React, { useCallback, useEffect, useState } from "react";
import { DateRange } from 'react-date-range';
import esLocale from 'date-fns/locale/es';
import "./style.css"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Search from "../../Component/Search/Search";
import { MainAccomodationRoomSearch, MainProduct, SectionSearch} from "../../Ui/Style/GeneralStyle";
import CardAccomodation from "../../Component/CardAccomodation/CardAccomodation";
import CalenderSearch from "../../Component/CalenderSearch/CalenderSearch";
import UseHotelActions from "../../Actions/useHotelsActions";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import moment from "moment";
import LoadingSkeleton from "../../Component/LoadingSkeleton/LoadingSkeleton";
import UseCalenderSearch from "../../Hooks/UseCalenderSearch";
import Header from "../../Component/Header/Header";
import EmpyCart from "../../Component/EmpyCart/EmpyCart";
import Cart from "../../Component/Cart/Cart";
import { IconRiCloseLargeLine } from "../../Component/Icons/Icons";
import UseCart from "../../Hooks/UseCart";
import LoadingOverlay from "../../Component/LoadingCreateReserva/LoadingOverlay";
import HeaderAccomodation from "../../Component/HeaderAccomodation/HeaderAccomodation";
import Footer from "../../Component/Footer/Footer";
import useRoomsPromotions from "../../Actions/useRoomsPromotions";
import WhatsappButton from "../../Component/WhatsappButton/WhatsappButton";
import { Environment } from "../../Config/Config";
import { Link } from "react-router-dom";

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


    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 800) {
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
        return <>  {hotel?.data?.map((List,index) => <CardAccomodation  
                                                              counPeople={hotel.counPeople}
                                                              endDate={hotel.endDate}
                                                              startDate={hotel.startDate}
                                                              nightsToday={hotel.nights}
                                                              promotion={promotion} 
                                                              totalCountAdults={totalCountAdults}
                                                              key={index} {...List}/>)}</>
    }
    const monthsToShow = window.innerWidth >= 700 ? 2 : 1;

    const [menuOpen, setMenuOpen] = useState(false);
    return (<div >
             <SectionSearch  >
             <header
        className={`fixed z-50 top-0 left-0 right-0 transition-colors duration-300 ${
          scrolled ? "bg-[#8f592c] text-white" : "bg-transparent text-white"
        }`}
      >
        <nav className="border-b p-2 border-white flex justify-between items-center space-x-6 max-w-[97%] mx-auto">
          <div className="text-2xl sm:text-3xl font-lora"><Link to="/"  > Hotel Gallery</Link> </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-[15px] hover:underline">
            HABITACIONES
            </a>
            <a href="#" className="text-[15px]hover:underline">
            COMODIDADES
            </a>
            <a href="#" className="text-[15px] hover:underline">
              EVENTOS
            </a>
          
          </div>
          <button className="bg-black text-white rounded-full px-3 sm:px-4 py-2 text-xs sm:text-base">
            COMO LLEGAR
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <span>Menu</span>
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-[#8f592c] text-white py-2">
            <a href="#" className="block px-4 py-2 hover:bg-[#a36a33]">
              Habitaciones
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-[#a36a33]">
              AMENITIES
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-[#a36a33]">
              KIIN
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-[#a36a33]">
              BLOG
            </a>
          </div>
        )}
      </header>
          </SectionSearch>
            <Toaster position="bottom-right"  richColors   />
            {loadingCart && <LoadingOverlay title={"Cargando..."} />}
       
          
            <WhatsappButton />
            {subtotal >0 &&<Cart    
                            checkbxo={checkbox} 
                            handClickCart={handClickCart} /> } 
          

          <CalenderSearch  HandClickMenuPeople={HandClickMenuPeople} 
                          formattedStartDateToString={formattedStartDateToString}
                          formattedEndDateToString={formattedEndDateToString}
                          HandClickMenuEnd={HandClickMenuEnd}
                          HandClickMenu={HandClickMenu}
                          onsubmit={PostHotelByIdHotel} 
                          totalCountAdults={totalCountAdults}
                          />
            <MainAccomodationRoomSearch className="  lg:flex  he  mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
              <MainProduct className="flex bg-[#eaeaea]  m-auto  items-center justify-between space-x-2 mb-8">
                <div className="flex border-chose  p-4  items-center space-x-1">
                  <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <span className=" text-white">Elegir un espacio

                  </span>
                </div>
                <div className="flex border-confirme  p-4 items-center space-x-1">
                  <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  <span className="text-gray-700">Confirmación</span>
                </div>
              </MainProduct>
            </MainAccomodationRoomSearch>

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
                          editableDateInputs={true}
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
                          showDateDisplay={true}
                          ranges={state}
                          direction="horizontal"
                          locale={esLocale}
                      />
                     <button
                      className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-[#ff7a45]"
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
               
                <div >
              
                <div className="p-2">
                    {FillContentPromotions()}
                  </div>
                    {FillContent()}
                </div>
               
            </div>
    );
}

export default Accommodation;
