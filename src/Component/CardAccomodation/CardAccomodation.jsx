import React, { useEffect, useState }  from "react";
import { ButtonSearch, MainAccomodationSection } from "../../Ui/Style/GeneralStyle";
import useCartActions from "../../Actions/useCartActions";
import { useSelector } from "react-redux";
import {toast} from "sonner"
import { IconFaUser, IconMdOutlineKingBed } from "../Icons/Icons";
import { IconShower, IconsSnow, IconsTv, IconsWifi } from "../Icons/Icons"
import { GiComputerFan } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";
import { PiBathtubLight } from "react-icons/pi";


const RadioButton = ({ name, id, checked, onChange, children }) => {
  return (
    <label className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <input 
          type="radio" 
          name={name} 
          id={id} 
          className="hidden" 
          checked={checked} 
          onChange={onChange} 
        />
        <div className={`w-5 h-5 border ${checked ? 'border-green-700' : 'border-gray-400'} rounded-full flex items-center justify-center`}>
          {checked && <div className="w-3 h-3 bg-green-700 rounded-full"></div>}
        </div>
      </div>
      {children}
    </label>
  );
};
    

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
  

    const   offerOptions= [
        { 
          id: "late-escape-1", 
          label: "12% off Late Escape", 
          benefits: [
            "1 Free Express Massage for 2 per stay",
            "Members discount applied"
          ], 
          price: 0,
          default: true
        },
        { 
          id: "late-escape-2", 
          label: "12% off Late Escape", 
          benefits: [
            "1 Free Express Massage for 2 per stay",
            "Members discount applied"
          ], 
          price: 103000
        }
      ]

    const Icon = () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          );
    };
    

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

  const visibleAmenities = showMore ? roomTypeFeatures : roomTypeFeatures.slice(0, 3);

  // Función para alternar la visibilidad de todo el contenido
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };



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
                    {/* Room Title and Amenities */}
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-bold text-green-900 mb-2">{roomTypeName}</h2>
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
                            className="text-green-700 mt-1 hover:underline text-sm text-left"
                          >
                            {showMore ?  'Ver menos' : 'Ver más'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Cancellation Policy */}
                    

                    {/* Offer */}
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium mb-2">Offer</h3>
                      <div className="flex flex-col gap-3">
                        {offerOptions.map((offer) => (
                          <RadioButton
                       
                          >
                            <div className="w-full flex justify-between">
                              <div>
                                <span className="text-sm font-medium">{offer.label}</span>
                                <div className="mt-1 text-sm">
                                  {offer.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-1">
                                      <Icon name="check" />
                                      <span>{benefit}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {offer.price > 0 && (
                                <span className="text-sm">+ {formatPrice(offer.price)}</span>
                              )}
                            </div>
                          </RadioButton>
                        ))}
                      </div>
                    </div>

                    {/* Accommodation Plan */}
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium mb-2">Accommodation plan</h3>
                      <div className="flex flex-col gap-3">
                          <RadioButton>
                            <div className="flex justify-between w-full">
                              <span className="text-sm">Only room</span>
                              
                                <span className="text-sm">+ONline room</span>
                              
                            </div>
                          </RadioButton>
                      </div>
                    </div>

                    {/* Price and Booking */}
                    <div className="p-4">
                      <div className="bg-[#a39672] rounded-xl text-white px-2 py-1 text-xs inline-block mb-2">
                        Members benefits applied -{10}%
                      </div>
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-end gap-1">
                          <span className="text-2xl font-bold">{formatPrice(roomRate)}</span>
                          <span className="text-sm text-gray-500 line-through">{formatPrice(roomRate)}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        <p>{formatPrice(roomRate)} for {roomRate} nights</p>
                        <p>Taxes excluded</p>
                        <a href="#" className="f2ecd9 hover:underline">Price details</a>
                      </div>
                      <button className="w-full bg-[#a39672] text-white py-2 px-4 rounded  transition">
                        Book
                      </button>
                    </div>
                  </div>
  )
}

export default CardAccomodation