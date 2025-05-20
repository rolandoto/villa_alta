import React, { useCallback, useEffect, useState } from "react"
import {Link, useNavigate } from "react-router-dom";
import Header from "../../Component/Header/Header"
import "./home.css"
import 'react-date-range/dist/styles.css'; // import the default styles
import 'react-date-range/dist/theme/default.css'; // import the default theme
import moment from 'moment';
import 'moment/locale/es';
import UseHotelActions from "../../Actions/useHotelsActions";
import "swiper/css";
import "swiper/css/navigation";
import { Environment } from "../../Config/Config";
import { useSelector } from "react-redux";
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
                <div className="w-full bg-white font-playfair">
                <div className="flex flex-wrap">
                  <div className="w-full m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {seccion?.roomTypePhotos?.slice(0, 3).map((img, i) => (
                        <div key={i} className="relative h-64 sm:h-80 md:h-[700px] overflow-hidden">
                          <img 
                            src={img} 
                            alt={`Imagen habitación ${i + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
              
                      <div className="bg-[#471b1b] p-6 sm:p-8 flex flex-col justify-center">
                        <h2 className="text-2xl sm:text-3xl tracking-[0.2em]  text-white font-light border-b-2 border-white pb-2 mb-4">
                          {seccion.roomTypeName}
                        </h2>
              
                        <div className="space-y-2">
                          {amenities.map((amenity, index) => (
                            <p key={index} className="text-base sm:text-lg tracking-[0.2em] text-white/90 font-light">
                              {amenity.text}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        ))}
    </>
  }

    return (
      <>
 
    <div className="relative w-full h-screen overflow-hidden">
      <img 
        src="https://www.villaaltaguesthouse.com/alta.jpg" 
        alt="Villa Alta Guest House" 
        className="scale-out-effect w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="https://www.villaaltaguesthouse.com/villalta.png" alt="Logo Villa Alta" className="w-[80%] md:w-[30%]  h-auto" />
      </div>
      
    </div>
    <button 
  onClick={PostHotelByIdHotel}
  aria-label="Reserva con nosotros"
  className="fixed bottom-4 right-4 bg-[#000000] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#5c2a2a] transition-all animate-bounce z-50 text-sm sm:text-base"
>
  Reserva con nosotros
</button>
    <section className="flex flex-col md:flex-row h-auto md:h-screen">
      <div className="bg-[#4b2328] text-white w-full md:w-1/2 p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="mb-6">
            <img src="https://www.villaaltaguesthouse.com/guest.png" alt="Logo Callejón de los Estribos" className="w-40" />
          </div>

          <div className="p-2 font-playfair bg-opacity-95 max-w-md">
              <p className="tracking-[0.2em] text-xs text-white/70 uppercase font-sf">
                Estamos ubicados en:
              </p>

              <h2 className="tracking-[0.2em] text-3xl font-bold border-b-2 mt-10 border-white pb-1 text-white">
                Centro Histórico
              </h2>
              <h3 className=" tracking-[0.2em] text-2xl font-bold border-b-2 mt-6 border-white pb-1 text-white">
                Callejón De Los Estribos
              </h3>
              <p className="tracking-[0.1em] text-2xl font-bold border-b-2 mt-6 border-white  pb-1 text-white">
                Nº 2-116 P2 AT1 <span className="italic text-white text-xs">/ Plaza Santo Domingo</span>
              </p>
              <p className="tracking-[0.3em]  text-xs leading-6  text-white mt-4 font-sf">
                JUSTO AL LADO DE LA PLAZA DE LA <br />
                IGLESIA DE SANTO DOMINGO CON UNA <br />
                AMPLIA OFERTA GASTRONÓMICA Y LUGARES <br />
                HISTÓRICOS DE GRAN INTERÉS
              </p>
            </div>
           </div>
      </div>

      <div className="w-full md:w-1/2">
        <img
          src="https://www.villaaltaguesthouse.com/balcon.jpeg" // Asegúrate de guardar la imagen en public/images/
          alt="Balcón en Cartagena"
          className="object-cover h-full w-full"
        />
      </div>
    </section>
    {FillContent()}
    <VillaAltaIntro/>
    <Footer/>
      
    </>
    )   
}

export default Home