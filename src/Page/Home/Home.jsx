import React, { useCallback, useEffect, useRef, useState } from "react"
import UseCalenderSearch from "../../Hooks/UseCalenderSearch";
import { DateRange } from 'react-date-range';
import esLocale from 'date-fns/locale/es';
import Search from "../../Component/Search/Search";
import {Link, useNavigate } from "react-router-dom";
import Header from "../../Component/Header/Header";
import CalenderSearchHome from "../../Component/CalenderSearch/CalenderSearchHome";
import TitleWelcome from "../../Component/TitleWelcome/TitleWelcome";
import Features from "../../Component/Features/Features";
import Footer from "../../Component/Footer/Footer";
import AccordionAsk from "../../Component/AccordionAsk/AccordionAsk";
import Events from "../../Component/Events/Events";
import RoomDetail from "../../Component/RoomDetail/RoomDetail";
import RoomPresentaion from "../../Component/RoomPresentation/RoomPresentation";
import "./home.css"
import { IconRiCloseLargeLine, IconsFaBanSmoking, IconsFaConciergeBell, IconsFaGlassMartini, IconsFaSquareParking, IconsFaStore, IconsGiForkKnifeSpoon, IconsRiBankFill, IconsaCar } from "../../Component/Icons/Icons";
import 'react-date-range/dist/styles.css'; // import the default styles
import 'react-date-range/dist/theme/default.css'; // import the default theme
import moment from 'moment';
import 'moment/locale/es';
import UseCart from "../../Hooks/UseCart";
import Cart from "../../Component/Cart/Cart";
import UseHotelActions from "../../Actions/useHotelsActions";
import { useSelector } from "react-redux";
import WhatsappButton from "../../Component/WhatsappButton/WhatsappButton";
import BookNowButton from "../../Component/BookNowButton/BookNowButton";

const Home =() =>{
  const navigate = useNavigate();
  moment.locale('es');
  
  useEffect(() => {
    // Scrolls to the top of the document on component mount
    window.scrollTo(0, 0);
}, []);

  const {getCartSubtotal} = UseCart()
  const {hotelList,loadingHotel,errorHotel}= useSelector((state) => state.Hotel)
  const {getListHotel} =UseHotelActions()

  const fetchDate =async() =>{
    await getListHotel()
  }

  useEffect(() =>{
    fetchDate()
  },[])

    
      const roomSectionRef = useRef(null);
      const roomEventsSectionRef = useRef(null);


      const [contextShowMenuPeople, setContextShowMenuPeople] = useState(false);
      const {handleSelect,state,
            setContextMenuPosition,
            contextMenuPosition,
            handChangeAdults,
            handChangeChildrem,
            handDecreaseAdults,
            handDecreaseChildren,
            totalCountAdults,
            adults,
            childrem ,
            getClassNameForDate } =  UseCalenderSearch()
        
      
    const formattedStartDateToString = moment(state?.[0]?.startDate ?? '').format('DD MMM YYYY').toLowerCase();

    const formattedEndDateToString = moment(state?.[0]?.endDate ?? '').format('DD MMM YYYY').toLowerCase();
    

    const PostHotelByIdHotel = useCallback(async () => {
      setContextMenuPosition(false);
      navigate("/Accomodation");
    }, []);


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
       
  
    const HandClickMenuEnd =() =>{
      if(contextMenuPosition){
        setContextMenuPosition(false)
      }else if(!contextMenuPosition){
        setContextMenuPosition(true)
      }
      setContextShowMenuPeople(false)
    }             

 
    const monthsToShow = window.innerWidth >= 700 ? 2 : 1; // Cambia 768 según tu punto de ruptura deseado

 

const rooms = [
  {title: 'Room Estándar superior', price:180000 , image:"https://grupo-hoteles.com/storage/app/7/rooms/702137671-37-rooms-slider-1-estandar_superior_lleras_park_concept_medellin_poblado_medellin_economico_colombia_antioquia.webp", 
    features: ['Cama doble', 'Baño privado con ducha', 'Wi-Fi gratuito', 'Smart TV',"Aire Acondicionado"] },
  {title: 'Room Estándar',price:160000, image: "https://grupo-hoteles.com/storage/app/7/rooms/1353190353-38-rooms-slider-2-Habitacion-Estandar-Hotel-lleras-park-concept-hotel-poblado-economico-slider-principal-1.webp", 
    features: ['Cama doble', 'Baño privado con ducha', 'Wi-Fi gratuito', 'Smart TV',"Aire Acondicionado"] },
  {title: 'Room Doble superior twin',price:260000, image: "https://grupo-hoteles.com/storage/app/7/rooms/585930631-39-rooms-slider-2-slider_1_doble_superior_twin_lleras_park_concept_medellin_poblado_medellin_economica_antioquia_colombia_med.webp", 
    features: ['Cama doble', 'Baño privado con ducha', 'Wi-Fi gratuito', 'Smart TV','Aire Acondicionado']},
  {title: 'Room Suite junior',price:407000, image: "https://grupo-hoteles.com/storage/app/7/rooms/286234936-40-rooms-slider-1-rooms-slider-1-superior_junior_jacuzzi_lleras_park_concept_medellin_poblado_medellin_economica_antioquia_colombia..webp", 
   features: ['Cama king', 'Baño privado con ducha', 'Wi-Fi gratuito', 'Smart TV','Aire Acondicionado']},
  {title: 'Room One Million',price:799000, image: "https://grupo-hoteles.com/storage/app/7/rooms/625520311-42-rooms-slider-1-one_million_lleras_park_concept_medellin_poblado_medellin_economica_antioquia_colombia_zona_rosa.webp", 
   features: ['Cama queen', 'Baño privado con ducha', 'Wi-Fi gratuito', 'Smart TV','Aire Acondicionado']},
];
/**
 * 
 *  
 * 
 */

const faqs = [
  {
    question: '¿Cuáles son los sitios turísticos de la ciudad y si están cerca al hotel?',
    answer: (
      <ul className="list-disc list-inside">
        <li>Teatros (3 a 9 min caminando)</li>
        <li>Museo de Antioquia</li>
        <li>Plaza Botero</li>
        <li>Jardín Botánico de Medellín</li>
        <li>Parque Lleras</li>
        <li>Comuna 13</li>
      </ul>
    ),
  },
  {
    question: '¿Cómo es la seguridad del sector? ¿se puede salir en la noche?',
    answer: 'La seguridad del sector es buena, pero siempre se recomienda tomar precauciones normales como en cualquier ciudad. Es seguro salir en la noche, especialmente en áreas concurridas y turísticas.',
  },
  {
    question: '¿Cuáles son los mejores centros comerciales de la ciudad de Medellín?',
    answer: (
      <ul className="list-disc list-inside">
        <li>Centro Comercial Santa Fe</li>
        <li>Centro Comercial El Tesoro</li>
        <li>Centro Comercial Oviedo</li>
        <li>Centro Comercial Premium Plaza</li>
      </ul>
    ),
  },
  {
    question: '¿Dónde puedo cambiar divisas?',
    answer: 'Puede cambiar divisas en casas de cambio ubicadas en centros comerciales, en el aeropuerto, y en diversas partes del centro de la ciudad.',
  },
];


    return (
      <>
      <BookNowButton />
      <WhatsappButton />
         <div className="relative w-full h-[1000px]">
            <img
              src="https://h-img1.cloudbeds.com/uploads/315191/img_3151~~66be7ab2bae2b.jpg"
              className="w-full h-full object-bottom" />
        <Header />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
              <h1 className="font-davinci text-4xl sm:text-6xl md:text-7xl mb-2 sm:mb-4"></h1>
                  <h2 className="font-lora text-5xl sm:text-7xl opacity-90 md:text-9xl">Lleras Park</h2>
                  <p className="mt-2 text-base opacity-90 md:text-xl lg:text-3xl font-lora font-normal">
                    Descansa cómodamente tras vivir la vibrante noche del Parque Lleras.  
                  </p>

              
                    <CalenderSearchHome 
                      HandClickMenuPeople={HandClickMenuPeople} 
                      formattedStartDateToString={formattedStartDateToString}
                      formattedEndDateToString={formattedEndDateToString}
                      HandClickMenuEnd={HandClickMenuEnd}
                      HandClickMenu={HandClickMenu}
                      onsubmit={PostHotelByIdHotel}
                      totalCountAdults={totalCountAdults}
                    />
                    
                
                
              <div className="hidden lg:block  ">
                {contextShowMenuPeople && 
                  <Search contextShowMenuPeople={contextShowMenuPeople}
                  top={650}
                  adults={adults}
                  childrem={childrem}
                  handChangeAdults={handChangeAdults}
                  handDecreaseAdults={handDecreaseAdults}
                  handChangeChildrem={handChangeChildrem}
                  handDecreaseChildren={handDecreaseChildren}
                  setContextShowMenuPeople={setContextShowMenuPeople}  />}
              </div>


          <div className="hidden lg:block  ">
              {contextMenuPosition && (
                <DateRange
                  className="flex  calender-search-home lg:hidden"
                  rangeColors={["#fbcfc0"]}
                  minDate={new Date()}
                  onChange={handleSelect}
                  editableDateInputs={false}
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
              <div class="  lg:hidden fixed inset-0 bg-white flex items-start justify-center z-50  md:shadow-[17px_20px_40px_rgba(0,0,0,0.21)] md:rounded-[1.25rem] md:!font-size[16px] md:!user-select-none">
                <div class="bg-white p-4  rounded-lg shadow-lg w-full h-full md:w-auto md:h-auto">
                  <button class="absolute top-4 right-4 text-black text-lg" onClick={() =>setContextMenuPosition(false)} ><IconRiCloseLargeLine /></button>
                 <div>
                    <h2 class="text-center text-2xl font-semibold mb-4">Selecionar fecha</h2>
                    <DateRange 
                          className="flex calender-search-home lg:hidden"
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
                     
                    </div>
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

        </div>
          </div>
          <TitleWelcome />
          <RoomPresentaion />
          <div ref={roomSectionRef} >   
            <RoomDetail ref={roomSectionRef}  rooms={rooms} />
          </div>
          <div ref={roomEventsSectionRef} >
            <Events  />
          </div>
          <WhatsappButton />
          <AccordionAsk faqs={faqs} />
          <Footer />
    </>
    )   
}

export default Home