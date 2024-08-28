import React from "react";
import { useNavigate } from "react-router-dom";

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
                <h3 className=" words  text-[#ff7a45] text-[23px]  mb-4">{title}</h3>
                <ul className="text-gray-700 h-[180px] text-left list-disc list-inside">
                {features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                ))}
               
                </ul>        
                <div className="PriceRoomDetail">
                    <div >
                        <strong className=" text-[20px] " >Desde ${parseInt(price).toLocaleString('es-CO')} cop</strong>
                    </div>
                    <button onClick={handSubmitNextReservation} className="text-white bg-orange-500 mt-4   w-[290px] md:w-[150px]  p-3 rounded hover:bg-orange-600"><span className=" text-[20px]" >Reservar</span></button>                  
                </div>   
        </div>
    )
}

export default CardRoomDetail