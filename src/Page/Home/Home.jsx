import React, { useCallback, useEffect } from "react"
import {Link, useNavigate } from "react-router-dom";
import Header from "../../Component/Header/Header"
import "./home.css"
import 'react-date-range/dist/styles.css'; // import the default styles
import 'react-date-range/dist/theme/default.css'; // import the default theme
import moment from 'moment';
import 'moment/locale/es';
import UseHotelActions from "../../Actions/useHotelsActions";
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
import VillaAltaIntro from "../../Component/VillaAltaIntro/VillaAltaIntro";

const Home =() =>{
  const navigate = useNavigate();
  moment.locale('es');
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

const images = [
  "https://h-img2.cloudbeds.com/uploads/316944/suite_duplex_-5cama_gallery~~67fe878e078e0.jpg"
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
                    <Link to="/Accomodation" >
                      <div
                        className={`h-full w-full bg-center bg-cover transition-transform duration-[3000ms] ease-in-out ${
                          isActive ? "scale-105" : ""
                        }`}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    </Link>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
  </section>
  ))}

          </>
  }

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
          <Link to="/Accomodation"  rel="noopener noreferrer">
            <div
              className={`cursor-pointer h-full w-full bg-center bg-cover transition-transform duration-[5000ms] ease-in-out ${isActive ? "scale-out-effect" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          </Link>
        )}
      </SwiperSlide>
    ))}
      <div className="swiper-button-prev">
        <FaChevronLeft  className=" size-48 text-white" /> 
      </div>
      <div className="swiper-button-next">
        <FaChevronRight   className="text-white" /> 
      </div>
    </Swiper>
    </div>
    {FillContent()}
    <VillaAltaIntro/>
    <Footer/>
    </>
    )   
}

export default Home