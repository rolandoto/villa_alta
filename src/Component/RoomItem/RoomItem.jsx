import React, { useState } from "react"
import { IconBsArrowDownShort, IconRiDeleteBinLine, IconsBsArrowUpShort } from "../Icons/Icons";
import moment from "moment";
import useCartActions from "../../Actions/useCartActions";

const RoomItem = ({ title,Price,person,start,end,roomByID }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dateStart=  moment(start).format('YYYY-MM-DD');
    const dateEnd=  moment(end).format('YYYY-MM-DD');

    const {RemoveCart} = useCartActions()

    const handletoRemoveCart =() =>{
        RemoveCart({roomByID})
    }
 
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    const Open = isOpen ?  <IconsBsArrowUpShort />   :<IconBsArrowDownShort />

    return (
      <div className="border-b border-y-black	 ">
        <div className="flex justify-between">
            <h4 className="font-medium" >{title}</h4>
            <button 
           
            className="text-red-500 hover:text-red-200"
            >
                <IconRiDeleteBinLine   handSubmit={handletoRemoveCart}  />
            </button>  
                
        </div>
        <button className="flex items-center " onClick={toggleAccordion} >
            <span className="text-normal text-[14px]">Ver detalles  </span>
            {Open}
        </button>

        {isOpen &&  ( <div className="flex justify-between  flex-col  ">
                        <div className="flex justify-between items-center ">
                            <span className="font-normal text-[13px] ">Entrada:</span>
                            <span className="font-normal text-[13px] ">{dateStart}</span>
                        </div>
                        <div className="flex justify-between  items-center ">
                            <span className="font-normal text-[13px] ">Salida:</span>
                            <span className="font-normal text-[13px] ">{dateEnd}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-normal text-[13px]   ">Regimen/plan:</span>
                            <span className="font-normal text-[13px] ">Alojamiento y Desayuno</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-normal text-[13px]   ">Ocupacion:</span>
                            <span className="font-normal text-[13px] ">{person} adultos</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-normal text-[13px]   ">Precio:</span>
                            <span className="font-normal text-[13px] ">{parseInt(Price).toLocaleString('es-CO')} cop</span>
                        </div>
                    </div>
        ) }
      </div>
    );
};

export default RoomItem