import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
const RoomPresentaion =() =>{
    const navigate = useNavigate();

    const HandNext = () =>{
        navigate("/Accomodation");
    }

    return (  <div className="bg-white py-12 px-4">
                <div className="container mx-auto max-w-7xl   flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-4 text-">
                    <h2 className="text-3xl font-normal text-center  text-black text-[30px] font-lora ">Reserva tu habitación hoy mismo</h2>
                    <p className="text-gray-700 text-justify mt-8 mb-4">
                    Nuestras habitaciones están diseñadas para ofrecer comodidad y estilo, a la vez que te sumergen en la vibrante escena artística de Medellín. Cada habitación está decorada con obras de artistas locales, creando un ambiente único e inspirador.
                    </p>
                    <p className="text-gray-700 text-justify mb-4">
                   
                    Nuestras habitaciones están diseñadas para ofrecer comodidad y estilo, a la vez que te sumergen en la vibrante escena artística de Medellín. Cada habitación está decorada con obras de artistas locales, creando un ambiente único e inspirador.
                    Lleras Park , a solo unos pasos del icónico Llera Park, conocido por su animada vida nocturna, restaurantes y bares de moda. Es la ubicación perfecta para explorar la ciudad y descubrir todo lo que Medellín tiene para ofrecer.
                    </p>
                    <button onClick={HandNext}  className="text-white rounded-full items-center  justify-center flex   bg-black  mt-4  w-[200px] p-3  ">
                       
                        Reservar   <FiArrowRight fontSize={23}/> </button>
                </div>
                <div className="md:w-1/2 p-4">
                <img 
                    src="https://h-img3.cloudbeds.com/uploads/315191/superior_foto_principal_habit_featured~~66be78e0861d1.jpeg" 
                    alt="Reservation" 
                    width="600" 
                    height="400" 
                    className="w-full rounded-3xl shadow-lg" 
                />
                </div>
                </div>
            </div>)
  

}

export default RoomPresentaion