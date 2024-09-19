import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CardRoomDetail =({features,image,title,price}) =>{


  

    const navigate = useNavigate();

    const handSubmitNextReservation =() =>{
        navigate("/Accomodation");
    }

    return (
        <div  className="  p-6 rounded-lg relative ">
              <img
                src={image}
                width="100" 
                height="100"
                alt={title}
                className="w-full h-auto md:h-[250px] mt-5 object-cover rounded-lg mb-4"
            />
                <h3 className=" words  text-white text-[23px]  mb-4">{title}</h3>
                <ul className="text-gray-700 h-[180px] text-left list-disc list-inside">
                {features.map((feature, idx) => (
                    <li className="text-white" key={idx}>{feature}</li>
                ))}
               
                </ul>        
                <div className="PriceRoomDetail">
                    <div >
                        <strong className=" text-[20px] text-white " >Desde ${parseInt(price).toLocaleString('es-CO')} cop</strong>
                    </div>
                    <button onClick={handSubmitNextReservation} className="text-white bg-black mt-4 flex items-center justify-center  w-[290px] md:w-[150px]  p-3 rounded-full hover:bg-black">
                        
                        Reservar   <FiArrowRight fontSize={23}/> </button>                  
                </div>   
        </div>
    )
}

export default CardRoomDetail