import React, { Fragment, useCallback, useState } from "react"
import RoomItem from "../RoomItem/RoomItem";
import { IconRiCloseLargeLine } from "../Icons/Icons";
import UseCart from "../../Hooks/UseCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const {cart,getCartSubtotal,getCartTotalCount} = UseCart()
    const subtotal = getCartSubtotal()
    const totalCount = getCartTotalCount()
    const navigate = useNavigate();


    const PostHotelByIdHotel = useCallback(async () => {
         navigate("/Checkout");
      }, []);


    //{numOfProductsInCart ==0 ? <EmpyCart title={"Tu carrito esta vacio"}  /> 
    //fixed top-20 z-50 cart let-0 right-0 bg-white transition duration-200  border rounded-md shadow-md w-80 mx-auto mt-10

      
    /**
     * 
     * <aside className={`fixed top-20 z-50  cart  ${checkbox ? "active" : ""}  let-0 right-0 bg-white transition duration-200  border rounded-md shadow-md w-80 mx-auto mt-10`}>
        <button className="absolute right-0  top-2"  onClick={handClickCart} >
            <IconRiCloseLargeLine />
        </button>
            <Fragment>
                <div >
                    <div className="p-4  bg-gray-100 ">
                        <h2 className="text-xl font-bold mb-4">Hotel gallery</h2>
                        <h2 className="text-xl">Total habitaciones ({totalCount})</h2>
                    </div>
                    <div className="p-4 space-y-4  overflow-auto max-h-[250px]    ">
                        {cart.map((cartItem,index) => (
                            <RoomItem   key={index}  
                                        {...cartItem} 
                                   />
                        ))}
                    </div>
                </div>
                <div className="w-full  bg-gray-100 pt-4">
                    <div className="p-4">
                        <h3 className="text-lg   font-normal">Total de la Reserva</h3>
                        <p className="text-black text-[30px] ">{subtotal.toLocaleString('es-CO')} COP</p>
                        <button className="mt-4 w-full px-4 py-2 items-center bg-orange-500 text-white rounded-md"
                            onClick={PostHotelByIdHotel}>Continuar</button>
                    </div>
                  
                </div>
            </Fragment>
      </aside>
     * 
     */

      
    return (
        <div className="fixed z-50 cart-shadow bg-black  bottom-0 left-0 right-0 flex flex-col md:flex-row items-center justify-between  p-4  rounded-t-lg">
            <div className="flex items-center">
            <div className="ml-4">
                <h3 className="text-2xl font-lora text-white">Habitaciones: {totalCount} </h3> {/* Update this line with the number of rooms */}
            </div>
            </div>
            <div >
            <div className="flex items-center">
                <h2 className="text-2xl font-lora  text-white">Total:</h2>
                <h3 className="text-2xl font-lora   text-white">${subtotal.toLocaleString('es-CO')} cop</h3> {/* Update this line with the number of rooms */}
            </div>
            </div>
            <button onClick={PostHotelByIdHotel} className=" Button-Search w-full rounded md:w-auto ml-0 md:ml-4 px-6 py-2 font-lora bg-orange-500 text-white">
            Confirmar la reserva
            </button>
      </div>
      
    );
  };
  export default Cart