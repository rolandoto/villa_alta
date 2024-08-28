import React, { Fragment, useState }  from "react";
import { ImginProduct, MainAccomodationRoom, MainProduct } from "../../Ui/Style/GeneralStyle";
import ButtonAccomodation from "../ButtonAccomodation/ButtonAccomodation";
import DescripctionAccomodation from "../DescripctionAccomodation/DescripctionAccomodation";
import TitleDinner from "../TitleDinner/TitleDinner";
import useCartActions from "../../Actions/useCartActions";
import { useSelector } from "react-redux";
import {toast} from "sonner"
import { IconFaUser } from "../Icons/Icons";
import { IconShower, IconTowels, IconsPiBedThin, IconsSnow, IconsTv, IconsWifi } from "../Icons/Icons"



const CardAccomodation =({  roomTypeName,
                            maxGuests,
                            roomRate,
                            roomTypePhotos,
                            promotion
                            ,counPeople,
                            endDate,
                            startDate,
                            roomsAvailable,
                            roomTypeID,
                            nightsToday,
                            roomTypeDescription,
                            roomTypeFeatures}) =>{

   
    const {cart} = useSelector(state => state.Cart);
    const originalPrice = roomRate; // Precio original
    const discountRate = 0.19; // 19% de descuento
    const discountedPrice = originalPrice * (1 - discountRate);   
    const validPromotions =promotion ? discountedPrice :  roomRate
         
    const {AddCart } =useCartActions()

    const [activeTab, setActiveTab] = useState('accommodation');

    const handleAddToCart = () => {
        const existingRoom = cart.find(item => item.roomTypeID === roomTypeID);
        if (existingRoom) {
            if(existingRoom.quantity +1 > roomsAvailable){
                toast.error("no hay habitaciones")
            }else{
                AddCart({ roomTypeID, roomTypeName,quantity: 1,Price:roomRate,roomsAvailable,startDate,endDate,room_image:roomTypePhotos[0].image,nights:nightsToday,person:counPeople,persontotal:counPeople}); 
            }
        }else{
            AddCart({ roomTypeID, roomTypeName,quantity: 1,Price:roomRate,roomsAvailable,startDate,endDate,room_image:roomTypePhotos[0].image,nights:nightsToday,person:counPeople,persontotal:counPeople}); 
        }
    };

/**
 * 
 * <MainAccomodationRoom className=" lg:flex    mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8"   >     
                    <MainProduct className="lg:flex block bg-white shadow-md"    >
                        <Fragment>
                            <TitleDinner />
                         
                            <ImginProduct   className="w-auto" src={roomTypePhotos[0].image}  alt="Hotel Image"/>
                    
                        </Fragment>
                        <DescripctionAccomodation max_people={maxGuests} promotion={promotion} cantidad={cantidad}   title={roomTypeName}  />
                        <ButtonAccomodation 
                                validPromotions={validPromotions}
                                max_people={maxGuests}
                                totalCountAdults={counPeople}
                                promotion={promotion}
                                handleAddToCart={handleAddToCart}
                                price={roomRate} 
                                nights={nightsToday}
                                person={counPeople}  />
                    </MainProduct> 
            </MainAccomodationRoom>
 * 
 */
          

    return (   

        
    <div className="max-w-5xl mx-auto p-8">
    <div className="bg-white accomodation shadow-lg">
      {/* sección superior con la imagen y detalles */}
      <div className="flex items-center">
        <div className="p-4">
          <img
            src={roomTypePhotos[0].image}
            alt="room"
            className="max-w-[390px] accomodation rounded-lg"
          />
        </div>

        <div className="w-1/2 p-4 items-center">
          <h2 className="text-2xl text-center font-bold">{roomTypeName}</h2>
          <div className="flex justify-between mt-4">
            <div className="text-center ">
              <p className="text-gray-600">Máxima ocupación</p>
              <div className="flex" >
                  {[...Array(counPeople)].map((_, i) => (
                            <IconFaUser key={i} color="black" />
                            ))}
                            {counPeople < maxGuests && (
                            [...Array(maxGuests - counPeople)].map((_, i) => (
                                <IconFaUser key={i + counPeople} color="#b3b3b3" />
                            ))
                            )}
              </div>
            
            </div>
            <div>
              <p className="text-gray-600">Estancia</p>
              <p className="font-bold" >Noches: {nightsToday} </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex px-3 rounded-full items-center justify-between border">
              <button className="py-1 mr-2">Tarifa estándar</button>
              <p className="font-bold">${parseInt(validPromotions).toLocaleString('es-CO')} cop</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido de las pestañas */}
      <div className="p-4">
        <div className="border-b flex max-w-[91%] m-auto justify-between">
          {['Alojamiento', 'Descripción', 'Comodidades', 'Fotos'].map((tab) => (
            <button
              key={tab}
              className={`text-gray-600 pb-2 ${activeTab === tab ? 'border-b-2 border-black' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Renderizado condicional del contenido según la pestaña activa */}
        {activeTab === 'Alojamiento' && (
          <div className="mt-4 max-w-[90%] m-auto">
            <span className="text-center font-bold" >{roomTypeName}</span>
          </div>
        )}
        {activeTab === 'Descripción' && (
          <div className="mt-4 max-w-[90%] m-auto">
            <span className="text-center font-bold" >{roomTypeName}</span>
            <p className="mt-5" dangerouslySetInnerHTML={{__html: roomTypeDescription}} ></p>
          </div>
        )}
        {activeTab === 'Comodidades' && (
          <div className="mt-4 ml-11 max-w-[80%] ">
             <div className="bg-white   mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roomTypeFeatures.map((Service, index) => {

                const wifi = Service=="Internet inalámbrico (WiFi)" && <IconsWifi  />

                const Aire = Service=="Aire Condicionado" && <IconsSnow  />

                const tv = Service=="Televisión por cable" && <IconsTv  />

                const bathRoom = Service=="baño privado" &&  <IconShower  />

                  return<div key={index} className="flex items-center space-x-3">
                    <span className={` flex items-center ${Service}`}>
                    {bathRoom} {tv} {Aire} {wifi} {Service} 
                    </span>
                  </div>
                })}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Fotos' && (
          <div className="grid grid-cols-4 gap-4 max-w-[90%] m-auto mt-4">
            {/* Aquí van las imágenes de las fotos */}
            {roomTypePhotos.map((itemImg, index) => (
              <img
                key={index}
                src={itemImg.image}
                alt="room"
                className="accomodation"
              />
            ))}
          </div>
        )}
      </div>
      {/* footer con botón */}
      <div className="p-4 flex justify-between underline">
        <button className="bg-black text-white py-4 px-4 rounded-">Reservar Habitacion</button>
      </div>
    </div>
  </div>
  )
}

export default CardAccomodation