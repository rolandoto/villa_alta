import React, { Fragment, useEffect, useState }  from "react";
import { ButtonSearch, ImgAccomodation, ImginProduct, MainAccomodationRoom, MainAccomodationSection, MainProduct } from "../../Ui/Style/GeneralStyle";
import ButtonAccomodation from "../ButtonAccomodation/ButtonAccomodation";
import DescripctionAccomodation from "../DescripctionAccomodation/DescripctionAccomodation";
import TitleDinner from "../TitleDinner/TitleDinner";
import useCartActions from "../../Actions/useCartActions";
import { useSelector } from "react-redux";
import {toast} from "sonner"
import { IconFaUser } from "../Icons/Icons";
import { IconShower, IconTowels, IconsPiBedThin, IconsSnow, IconsTv, IconsWifi } from "../Icons/Icons"
import { FiChevronLeft,FiChevronRight  } from "react-icons/fi";
import { GiComputerFan } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";


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

    const [activeTab, setActiveTab] = useState('Comodidades');

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
        
      const [currentIndex, setCurrentIndex] = useState(0);

      const handleNext = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === roomTypePhotos.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? roomTypePhotos.length - 1 : prevIndex - 1
        );
      };


  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Cada vez que el src cambie, activamos la animación
    setAnimationClass('animation');
    // Limpiamos la animación después de que termine
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 300); // Duración de la animación en milisegundos (0.3s)

    // Cleanup en el desmontaje o cuando cambie src
    return () => clearTimeout(timer);
  }, [currentIndex]);


    return (   
    <MainAccomodationSection>
    <div className="max-w-5xl  mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white border shadow-lg accomodation overflow-hidden">
        {/* Upper section with image and details */}
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="w-full md:w-1/2 p-4">
            <img
              src={roomTypePhotos[currentIndex].image}
              alt="room"
              className={`w-full h-auto ${animationClass}  accomodation `}
            />
             <div className="relative w-full   p-4">
              <button
                onClick={handlePrev}
                className="absolute -top-36 md:-top-44 lg:-top-44 left-2 transform -translate-y-1/2 bg-[#ffffff81] p-2 rounded-full shadow-lg 
                              transition duration-200 hover:scale-110 hover:bg-white
                              hover:text-sm hover:duration-200"
              >
                <FiChevronLeft fontSize={25} color="black" />
              </button>
              <button
                    onClick={handleNext}
                    className="absolute -top-36 md:-top-44 lg:-top-44 right-2 transform -translate-y-1/2 bg-[#ffffff81] p-2 rounded-full shadow-lg 
                              transition duration-200 hover:scale-110 hover:bg-white
                              hover:text-sm hover:duration-200"
                  >
                    
                <FiChevronRight fontSize={25} color="black"/>
              </button>

              <div className="flex justify-center mt-0">
                {roomTypePhotos.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 mx-1 rounded-full ${
                      index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">{roomTypeName}</h2>
            <div className="flex flex-col sm:flex-row justify-between mt-4">
              <div className="text-center mb-4 sm:mb-0">
                <p className="text-gray-600">Máxima ocupación</p>
                <div className="flex justify-center">
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
              <div className="text-center">
                <p className="text-gray-600">Estancia</p>
                <p className="font-bold">Noches: {nightsToday}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex px-3 py-2 rounded-full items-center justify-between border">
                <button className="text-sm sm:text-base">Tarifa estándar</button>
                <p className="font-bold">${parseInt(validPromotions).toLocaleString('es-CO')} cop</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:p-0 p-4">
          <div className="border-b flex flex-wrap justify-between max-w-[95%] mx-auto">
            {['Descripción', 'Comodidades'].map((tab) => (
              <button
                key={tab}
                className={`text-gray-600 pb-2 mb-2 text-sm sm:text-base ${activeTab === tab ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Conditional rendering of content based on active tab */}
          <div className="mt-4 max-w-[95%] mx-auto">
            {activeTab === 'Alojamiento' && (
              <span className="text-center font-bold block">{roomTypeName}</span>
            )}
            {activeTab === 'Descripción' && (
              <>
                <span className="text-center  font-bold block mb-4">{roomTypeName}</span>
                <p className="mt-5 text-justify " dangerouslySetInnerHTML={{__html: roomTypeDescription}}></p>
              </>
            )}
            {activeTab === 'Comodidades' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {roomTypeFeatures.map((Service, index) => {
                  const wifi = Service === "Internet inalámbrico (WiFi)" && <IconsWifi />;
                  const Aire = Service === "Aire Condicionado" && <IconsSnow />;
                  const tv = Service === "Televisión por cable" && <IconsTv />;
                  const bathRoom = Service === "baño privado" && <IconShower />;
                  const fan =  Service =="Ventiladores de Techo" && <GiComputerFan fontSize={35} />
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <span className={`flex items-center ${Service}`}>
                        {bathRoom || tv || Aire || wifi || fan} {Service}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
           
          </div>
        </div>
        {/* Footer with button */}
        <div className="p-4 flex justify-between">
            <ButtonSearch onClick={handleAddToCart} className="  justify-center  items-center    flex  cursor-pointer z-40   w-[250px] bg-black text-white py-4    rounded-full hover:bg-[ff7a45px] transition duration-200">
                Reservar Habitacion <FiArrowRight fontSize={25}/>
            </ButtonSearch>
       
        </div>
      </div>
    </div>
    </MainAccomodationSection>
  )
}

export default CardAccomodation