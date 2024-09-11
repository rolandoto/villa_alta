import React from "react"
import { useNavigate } from "react-router-dom";

const BookNowButton  =() =>{
    
    const navigate = useNavigate();

    const gotoNextAccomodation =() =>{
        navigate("/Accomodation");
    }

    return <>
            <div className="fixed lg:hidden  transform -translate-y-0  transition duration-200   w-full  z-50 m-auto bottom-0 flex justify-center items-center p-4">
                <button onClick={gotoNextAccomodation}  className= " w-[100%]  bg-black text-white text-sm font-bold py-3 px-10 rounded-full shadow-md hover:bg-gray-800 transition duration-300">
                <span className="text-2xl sm:text-3xl font-lora" >Reservar</span> 
                </button>
            </div>
            <div className="fixed lg:flex hidden animation  transform -translate-y-0  transition duration-200  w-full  z-50 m-auto bottom-0  justify-center items-center p-4">
                <button onClick={gotoNextAccomodation}  className= " w-[55%]   bg-black text-white text-sm font-bold py-3 px-10 rounded-full shadow-md hover:bg-gray-800 transition duration-300">
                    <span className="text-3xl sm:text-4xl md:text-2xl lg:text-2xl text-white font-serif" >Reservar</span> 
                </button>
            </div>
            </> 
}

export default BookNowButton 