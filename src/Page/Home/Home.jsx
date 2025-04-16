import React, { useCallback, useEffect,useState } from "react"
import UseCalenderSearch from "../../Hooks/UseCalenderSearch";
import {useNavigate } from "react-router-dom";
import Header from "../../Component/Header/Header"
import "./home.css"
import 'react-date-range/dist/styles.css'; // import the default styles
import 'react-date-range/dist/theme/default.css'; // import the default theme
import moment from 'moment';
import 'moment/locale/es';
import UseHotelActions from "../../Actions/useHotelsActions";
import WhatsappButton from "../../Component/WhatsappButton/WhatsappButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // 👈 importa Autoplay
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importa las flechas de React Icons
import { Environment } from "../../Config/Config";
import { useSelector } from "react-redux";
import { FaWhatsapp } from "react-icons/fa";
import { MdConnectedTv } from "react-icons/md";
import { IconShower, IconsSnow, IconsTv } from "../../Component/Icons/Icons";
import { TbFridge } from "react-icons/tb";
import Footer from "../../Component/Footer/Footer";

const Home =() =>{
  const navigate = useNavigate();
  moment.locale('es');
  



  useEffect(() => {
    // Scrolls to the top of the document on component mount
    window.scrollTo(0, 0);
}, []);

const images = [
  "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp"
];  

const {ErrorRoomTypes,RoomsType,LoadingRoomTypes}= useSelector((state) => state.Hotel)
const {getRoomsTypes} =  UseHotelActions()

  const fetchDate =async() =>{
    await getRoomsTypes({token:Environment.Token,propertyID:Environment.propertyID})
  }

  useEffect(() =>{
    fetchDate()
  },[])


  
  const PostHotelByIdHotel = useCallback(async () => {
    setContextMenuPosition(false);
    navigate("/Accomodation");
  }, []);

  
  const amenities = [
    { icon: <MdConnectedTv  fontSize={40}/>, text: "Wifi" },
    { icon: <IconsSnow  fontSize={40} />,  text: "Aire Acondicionado" },
    { icon:<IconsTv  fontSize={40}/>, text: "TV" },
    { icon:<IconShower    fontSize={40}/>,text: "Baño privado" },
    { icon:<TbFridge    fontSize={40}/>,text: "Minibar" },
  ];
  const FillContent =()=>{
    if(LoadingRoomTypes){
      return  <div  className=" lg:flex  mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
              <h1>Cargando...</h1>
              </div> 
    }
    if(ErrorRoomTypes){
     return  (
              <div  className=" lg:flex    mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
              error al cargar
              </div> 
     ) 
    }
   return <> {RoomsType.map((seccion, idx) => (
            <section
            key={idx}
            className={`flex ${
              idx % 2 !== 0 ? "bg-black" : "bg-[#807451]"} mx-auto flex-col md:flex-row h-auto md:h-[600px] ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}  overflow-hidden m-auto `}>
     
            <div className="w-full md:w-1/2 text-[#F7F5E5]  p-8 md:p-16 flex flex-col justify-center items-center text-center">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">{seccion.roomTypeName}</h2>
              <p className="text-sm md:text-base mb-12">
              <span
                dangerouslySetInnerHTML={{
                  __html: seccion.roomTypeDescription
                    ? seccion.roomTypeDescription.slice(0, 500) + '...'
                    : '',
                }}>

                </span>
              </p>
              <div className="grid grid-cols-4 gap-6 mb-12 w-full">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="mb-2">
                      {amenity.icon}
                    </div>
                    <span className="text-xs text-center">{amenity.text}</span>
                  </div>
                ))}
              </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={PostHotelByIdHotel}
                className="bg-[#f2ecd9] rounded-3xl text-[#a39672] px-6 py-3 font-medium text-sm uppercase">
                RESERVA AHORA
              </button>
              
              <a href="https://wa.me/3215062187" className="text-white">
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <FaWhatsapp className="w-6 h-6" />
                </div>
              </a>
            </div>
            </div>
   
          <div className="w-full md:w-1/3 h-[300px] md:h-full p-4 md:p-20">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop
              centeredSlides
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              speed={1000}
              className="h-full  overflow-hidden"
            >
              {seccion?.roomTypePhotos?.map((img, i) => (
                <SwiperSlide key={i}>
                  {({ isActive }) => (
                    <a href="https://www.ejemplo.com" target="_blank" rel="noopener noreferrer">
                      <div
                        className={`h-full w-full bg-center bg-cover transition-transform duration-[3000ms] ease-in-out ${
                          isActive ? "scale-105" : ""
                        }`}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    </a>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
  </section>
  ))}

          </>
  }


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

    /**
     * 
     *       <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
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
     * 
     */


    return (
      <>
      <Header />
      <div className="w-full h-screen bg-black">
      <Swiper
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      loop
      centeredSlides
      slidesPerView={1}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      speed={1000}
      className="h-full text-white"
    >
     {images.map((img, index) => (
      <SwiperSlide key={index}>
        {({ isActive }) => (
          <a href="https://www.ejemplo.com"  rel="noopener noreferrer">
            <div
              className={`cursor-pointer h-full w-full bg-center bg-cover transition-transform duration-[5000ms] ease-in-out ${isActive ? "scale-out-effect" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          </a>
        )}
      </SwiperSlide>
    ))}

      {/* Flechas de navegación personalizadas */}
      <div className="swiper-button-prev">
        <FaChevronLeft  className=" size-48 text-white" /> {/* Flecha izquierda */}
      </div>
      <div className="swiper-button-next">
        <FaChevronRight   className="text-white" /> {/* Flecha derecha */}
      </div>
    </Swiper>
    </div>

  
  {FillContent()}


  <section className="bg-[#f6f2df] text-black py-16 px-6 md:px-20 font-serif">
      <div className="max-w-6xl mx-auto text-center">
        {/* Título */}
        <div className="relative mb-10 flex items-center justify-center">
       
          <h1 className="text-4xl md:text-5xl font-bold text-[#002d1e]">
            Villa Alta, <span className="italic">Cartagena</span>
          </h1>
      
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify text-lg leading-relaxed">
          <div>
            <p>
              Entre murallas centenarias y callejones cargados de historia, una fachada azul celeste se alza como
              reflejo del cielo caribeño. Villa Alta no es solo un hotel: es un faro de distinción y sofisticación en el
              corazón del centro histórico de Cartagena.
            </p>
            <br />
            <p>
              Nuestra casa no es solo un lugar para hospedarse; es una experiencia. Al cruzar su umbral, los huéspedes
              son recibidos por un interior vibrante, lleno de color, glamour y texturas cuidadosamente seleccionadas.
            </p>
          </div>
          <div>
            <p>
              Cada rincón ha sido diseñado para despertar los sentidos, fusionando detalles elegantes con toques
              extravagantes que crean una atmósfera inigualable.
            </p>
            <br />
            <p>
              Villa Alta representa la perfecta unión entre la herencia histórica y el diseño contemporáneo. Es un
              espacio donde las historias del pasado se entrelazan con la visión de una nueva generación, dando lugar a
              una experiencia marcada por la elegancia, la exclusividad y el carácter.
            </p>
          </div>
        </div>

        {/* Botón */}
        <div className="mt-10">
          <a
            href="#habitaciones"
            className="inline-block border-2 border-black rounded-full px-6 py-2 text-lg font-bold hover:bg-black hover:text-white transition-colors"
          >
            HABITACIONES
          </a>
        </div>
      </div>
    </section>
  <Footer/>
  
    </>
    )   
}

export default Home