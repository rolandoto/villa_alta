import React, { useCallback } from "react"
import UseCart from "../../Hooks/UseCart";
import { useNavigate } from "react-router-dom";
import { ButtonSearch } from "../../Ui/Style/GeneralStyle";
import { FiArrowRight } from "react-icons/fi";

const Cart = () => {

    const {getCartSubtotal,getCartTotalCount,getCartTotalCountPerson} = UseCart()
    const subtotal = getCartSubtotal()
    const totalCount = getCartTotalCount()
    const quantityPerson = getCartTotalCountPerson()

    const navigate = useNavigate();


    const PostHotelByIdHotel = useCallback(async () => {
         navigate("/Checkout");
      }, []);

      
    return (
        <div className="w-full p-4 z-50  fixed bottom-0 bg-white border-t border-gray-300 shadow-lg flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-black">${subtotal.toLocaleString('es-CO')} cop</span>
          <span className="text-sm text-black">{totalCount} Habitacion {quantityPerson} huéspedes</span>
        </div>
        <div className=" flex justify-between">
            <ButtonSearch onClick={PostHotelByIdHotel} className="  justify-center  items-center lg:text-[15px]  text-[12px]  flex  cursor-pointer z-40 lg:w-[250px]   w-[150px] bg-[#a39672] text-white lg:py-4 py-2    rounded-full hover:bg-[ff7a45px] transition duration-200">
                Confirmar Reserva <FiArrowRight fontSize={25}/>
            </ButtonSearch>
        </div>
       
      </div>

       
      
    );
  };
  export default Cart