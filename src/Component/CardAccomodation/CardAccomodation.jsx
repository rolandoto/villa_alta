import React, { useEffect, useState }  from "react";
import useCartActions from "../../Actions/useCartActions";
import { useSelector } from "react-redux";
import {toast} from "sonner"
import { IconFaUser, IconMdOutlineKingBed } from "../Icons/Icons";
import RadioButton from "../RadioButton/RadioButton";



    

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

      // Formatear precio en formato COP
      const formatPrice = (price) => {
        return `COP ${price.toLocaleString('es-CO')}`;
      };
  

 
    const Icon = () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          );
    };
    

    const {AddCart } =useCartActions()

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


        
      const [currentIndex, setCurrentIndex] = useState(0);

      const handleNext = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === roomTypePhotos.length - 1 ? 0 : prevIndex + 1
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
    setAnimationClass('animation');
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 300); 

    return () => clearTimeout(timer);
  }, [currentIndex]);


  const [showMore, setShowMore] = useState(false);


  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const toggleShowMoreDescription = () => {
    setShowMoreDescription(!showMoreDescription);
  };


  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


  const visibleAmenities = showMore ? roomTypeFeatures : roomTypeFeatures.slice(0, 3);

  const visibleDescription = showMoreDescription ? roomTypeDescription : roomTypeDescription.slice(0, 80);


    return (   
          <div  className="max-w-lg  border border-gray-200  overflow-hidden bg-white shadow-sm">        
                    <div className="relative">
                      <img 
                        src={roomTypePhotos[currentIndex].image}
                        alt={roomTypeName} 
                        className={`w-full object-cover  h-auto ${animationClass}   `}
                      />
                     
                    </div>
                    
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex flex-col gap-3">

                      <div className=" bottom-2 left-2 flex gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-1  bg-opacity-60 px-2 py-1 rounded">
                             <IconFaUser  />
                          <span>{counPeople}</span>
                        </div>
                       
                        

                        <div className="flex items-center gap-1 bg-opacity-60 px-2 py-1 rounded">
                          <IconMdOutlineKingBed/>
                          <span>1</span>
                        </div>
                      </div>

                      </div>
                    </div>
                   
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-bold text-gray-900 mb-2">{roomTypeName}</h2>
                      <div className="text-gray-600 flex flex-col gap-1">
                        {visibleAmenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Icon name={amenity} />
                            <span>{amenity}</span>
                          </div>
                        ))}
                        {roomTypeFeatures.length > 3 && (
                          <button 
                            onClick={toggleShowMore}
                            className="text-gray-600 mt-1 hover:underline text-sm text-left">
                            {showMore ?  'Ver menos' : 'Ver más'}
                          </button>
                        )}
                      </div>
                    </div>


                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-bold text-gray-900 mb-2">Descripcion</h2>
                      <div className="text-gray-600 flex flex-col gap-1">
                          <div className="flex items-center gap-2"
                          >
                            <span className="text-justify"  dangerouslySetInnerHTML={{
                            __html: visibleDescription
                          }}></span>
                          </div>
                      
                        {roomTypeFeatures.length > 3 && (
                          <button 

                            onClick={toggleShowMoreDescription}
                            className="text-gray-600 mt-1 hover:underline text-sm text-left"
                          >
                            {showMoreDescription ?  'Ver menos' : 'Ver más'}
                          </button>
                        )}
                      </div>
                    </div>

                   
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium mb-2">Oferta</h3>
                      <div className="flex flex-col gap-3">
                          <RadioButton
                            checked={true}>
                            <div className="w-full items-center flex justify-between">
                              <div>
                                <div className="mt-1 text-sm">
                                    <div className="flex items-center gap-1">
                                      <Icon name="check" />
                                      <span>Descuento para miembros aplicado</span>
                                    </div>
                                </div>
                              </div>
                                <span className="text-sm">+ {formatPrice(validPromotions)}</span>
                            </div>
                          </RadioButton>
                      </div>
                    </div>
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium mb-2">Plan de alojamiento</h3>
                      <div className="flex flex-col gap-3">
                        <RadioButton
                        checked={true}
                          >
                          <Icon name="check" />
                          <div className="flex justify-between w-full">
                            <span className="text-sm">Solo habitación</span>
                            <span className="text-sm">+ Habitación online</span>
                          </div>
                        </RadioButton>
                        <RadioButton
                        checked={true}
                          >
                          <Icon name="check" />
                          <div className="flex justify-between w-full">
                            <span className="text-sm">Desayuno</span>
                            <span className="text-sm">+ Habitación online</span>
                          </div>
                        </RadioButton>
                      </div>
                    </div>
                    <div className="p-4">
                       {validPromotion && 
                       <div className="bg-[#a39672] rounded-xl text-white px-2 py-1 text-xs inline-block mb-2">
                       Beneficios para miembros aplicados -{10}%
                     </div> } 
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-end gap-1">
                          <span className="text-2xl font-bold">{formatPrice(validPromotions)}</span>
                        </div>
                      </div>
                      <button onClick={handleAddToCart} className="w-full bg-[#a39672] text-white py-2 px-4 rounded  transition">
                        Reservar
                      </button>
                    </div>
                  </div>
  )
}

export default CardAccomodation