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

  /*
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? roomTypePhotos.length - 1 : prevIndex - 1
    );
  };
  */


  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        handleNext()
      }, 1000);
    }, 3000); 
    return () => clearInterval(interval);
  }, []); 


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

/**
 * 
 *   <div className="flex justify-between" >
                <div className="  ">
                    <button className="rounded-full "
                    onClick={handlePrev}>
                      <img src="https://kiinliving.com/arrow_carousel.svg" width={40} height={40} alt="Arrow" className="rotate-180  w-28 h-24" />
                    </button>
                </div>     

                <div className=" flex ">
                <button className="rounded-full "
                        onClick={handleNext}>
                      <img src="https://kiinliving.com/arrow_carousel.svg" width={20} height={20} alt="Arrow" className=" w-28 h-24" />
                    </button>
                </div>
          </div>
 * 
 */
    return (
    
      <div className="lg:p-4 m-auto p-4" >
      <div className="max-w-md mx-auto   overflow-hidden">
          <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif">
                  <span className="text-white">{roomTypeName}</span>
                </h2>
              </div>
          </div>
         

          <div className="">
              <img src={roomTypePhotos[currentIndex]} alt="Profile" 
                className={` w-full ${animationClass} rounded-3xl  shadow-full  w-full h-[400px] object-cover}`}/>
          </div>
          
            <div className="flex justify-center mt-8">
                {roomTypePhotos.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 mx-1 rounded-full ${index === currentIndex ? "bg-black" : "bg-white"}`}
                  />
                ))}
            </div>

    
        

        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex space-x-4">
           
          </div>
        </div>
       
        
        <div className="px-4 py-2">
        <p className="text-[18px]  line-clamp-4 text-justify font-serif   text-white "    dangerouslySetInnerHTML={{ __html: roomTypeDescription }}>
        </p>
  
       
        </div>
      </div>
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