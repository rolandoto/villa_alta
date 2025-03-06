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
import { PiBathtubLight } from "react-icons/pi";


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
                            validPromotion,
                            roomTypeDescription,
                            roomTypeFeatures,
                            
                            validCode
                          }) =>{

   
    const {cart} = useSelector(state => state.Cart);
    const originalPrice = roomRate; // Precio original
    const discountRate = 0.19; // 19% de descuento
    const discountedPrice = originalPrice * (1 - discountRate);   
    const validPromotions =promotion ? discountedPrice :  roomRate


    const {AddCart } =useCartActions()

    const [activeTab, setActiveTab] = useState('Detalle');

    const handleAddToCart = () => {
        const existingRoom = cart.find(item => item.roomTypeID === roomTypeID);
        if (existingRoom) {
            if(existingRoom.quantity +1 > roomsAvailable){
                toast.error("no hay habitaciones")
            }else{
                AddCart({ roomTypeID, roomTypeName,quantity: 1,Price:roomRate,roomsAvailable,startDate,endDate,room_image:roomTypePhotos[0].image,nights:nightsToday,person:counPeople,persontotal:counPeople,validCode}); 
            }
        }else{
            AddCart({ roomTypeID, roomTypeName,quantity: 1,Price:roomRate,roomsAvailable,startDate,endDate,room_image:roomTypePhotos[0].image,nights:nightsToday,person:counPeople,persontotal:counPeople,validCode}); 
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


      useEffect(() => {
        const interval = setInterval(() => {
          setTimeout(() => {
            handleNext()
          }, 1000);
        }, 3000); 
        return () => clearInterval(interval);
      }, []); 
    

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


  const [showMore, setShowMore] = useState(false);

  // Límite de caracteres a mostrar antes de "Ver más"
  const characterLimit = 0;

  // Función para alternar la visibilidad de todo el contenido
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

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
            <div className="flex flex-col pr-4 sm:flex-row justify-between mt-4">
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
                {validPromotion && <div className="inline-block border  bg-red-600 text-white font-bold text-small px-2 py-2 rounded-md">
                  -10%
                </div>
                 }
                <p className="font-bold">${parseInt(validPromotions).toLocaleString('es-CO')} cop</p>
              </div>
            </div>
          </div>
        </div>
    
        {/* Tabs content */}
        <div className="lg:p-0 p-4">
          <div className="border-b flex flex-wrap justify-center max-w-[95%] mx-auto">
            {['Detalle'].map((tab) => (
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
          <div className="mt-4 lg:flex   block justify-between  max-w-[95%] mx-auto">
            {activeTab === 'Detalle' && (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
                {roomTypeFeatures.map((Service, index) => {
                  const wifi = Service === "Internet inalámbrico (WiFi)" && <IconsWifi />;
                  const Aire = Service === "Aire Condicionado" && <IconsSnow />;
                  const tv = Service === "Televisión por cable" && <IconsTv />;
                  const bathRoom = Service === "baño privado" && <IconShower />;
                  const fan =  Service =="Ventiladores de Techo" && <GiComputerFan fontSize={35} />
                  const Jacuzzi = "Jacuzzi privado" && <PiBathtubLight fontSize={35} />
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <span className={`flex items-center ${Service}`}>
                        {bathRoom || tv || Aire || wifi || fan || Jacuzzi } {Service}
                      </span>
                    </div>
                  );
                })}
               
              </div>
            )}


          <div className="lg:block hidden rounded-3xl lg:w-[70%]">
              <p className="text-justify" dangerouslySetInnerHTML={{ __html: roomTypeDescription }}></p>
            </div>

            {/* Bloque para dispositivos grandes, con opción de "Ver más" */}
            <div className="lg:hidden  rounded-3xl lg:w-[70%]">
              <p className="text-justify">
                <span
                  dangerouslySetInnerHTML={{
                    __html: showMore
                      ? roomTypeDescription
                      : `${roomTypeDescription.slice(0, characterLimit)}...`,
                  }}
                ></span>
              </p>
              <button
                className=" hover:underline"
                onClick={toggleShowMore}
              >
                {showMore ? "Ver menos" : "Ver más información"}
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-between">
            <ButtonSearch onClick={handleAddToCart} className="  justify-center  items-center    flex  cursor-pointer z-40   w-[250px] bg-black text-white py-4    rounded-full hover:bg-[ff7a45px] transition duration-200">
                Selecionar <FiArrowRight fontSize={25}/>
            </ButtonSearch>
       
        </div>
      </div>
    </div>
    </MainAccomodationSection>
  )
}

export default CardAccomodation