import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Header from "../../Component/Header/Header";
import { useSelector } from "react-redux";
import LoadingSkeleton from "../../Component/LoadingSkeleton/LoadingSkeleton";
import EmpyCart from "../../Component/EmpyCart/EmpyCart";
import UseHotelActions from "../../Actions/useHotelsActions";
import { Environment } from "../../Config/Config";
import BookNowButton from "../../Component/BookNowButton/BookNowButton";


const ApartmentCard = ({ roomTypePhotos,roomTypeNameShort, roomTypeName, roomTypeDescription , index}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const [animationClass, setAnimationClass] = useState('');


  
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


  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };


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
     
      
      <div className="relative w-full max-w-[450px] mx-auto aspect-square p-4 lg:p-8 mb-8">
      {/* Título de la habitación */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif text-white">
          {roomTypeName}
        </h2>
      </div>
    
      {/* Imagen con sombra y borde redondeado */}
      <div className="relative w-full h-full rounded-3xl shadow-xl overflow-hidden">
        <img
          src={roomTypePhotos[currentIndex]}
          alt="Luxury bedroom"
          className={`w-full h-full object-cover transition-transform duration-500 ${animationClass}`}
        />
      </div>
    
      {/* Indicadores de imagen (paginación) */}
      <div className="flex justify-center mt-6 space-x-2">
        {roomTypePhotos.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-black' : 'bg-white'
            }`}
          />
        ))}
      </div>
    
      {/* Botones de navegación */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition duration-300"
          onClick={handlePrev}
        >
          <img
            src="https://kiinliving.com/arrow_carousel.svg"
            alt="Previous"
            className="w-8 h-8 rotate-180"
          />
        </button>
    
        <button
          className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition duration-300"
          onClick={handleNext}
        >
          <img
            src="https://kiinliving.com/arrow_carousel.svg"
            alt="Next"
            className="w-8 h-8"
          />
        </button>
      </div>
    
      {/* Descripción de la habitación */}
      <p
        className="text-lg font-serif text-justify text-white mt-6 leading-relaxed line-clamp-4"
        dangerouslySetInnerHTML={{ __html: roomTypeDescription }}
      ></p>
    </div>
    
    
    );
  };
  
const Rooms =() =>{

  const {ErrorRoomTypes,RoomsType,LoadingRoomTypes}= useSelector((state) => state.Hotel)
  const {getRoomsTypes} =  UseHotelActions()

  const fetchDate =async() =>{
    await getRoomsTypes({token:Environment.Token,propertyID:Environment.propertyID})
  }


  const [scrolledbook, setScrolledBook] = useState(false);
      
    useEffect(() => {
      const handleScroll = () => {
       if(window.scrollY > 200){
          setScrolledBook(true)
        } else {
          setScrolledBook(false)
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  useEffect(() =>{
      fetchDate()
  },[])

    const FillContent =()=>{
      if(LoadingRoomTypes){
        return  <div  className=" lg:flex    mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
                <LoadingSkeleton />
                </div> 
      }
      if(ErrorRoomTypes){
       return  (
                <div  className=" lg:flex    mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
                  <EmpyCart title={"Error al cargar las habitaciones"} />
                </div> 
       ) 
      }
     return <>  {RoomsType.map((apartment, index) => (
                  <ApartmentCard
                        {...apartment}
                        key={index}
                        index={index + 1}/>
                  ))}
            </>
    }

    return  <>
      <div >
      <BookNowButton/> 
        <Header />
          <section className="py-12 mt-8">
            <div className="lg:flex block  gap-8">
                {FillContent()}
            </div>
          </section>
      </div>
            </>
}

export default Rooms