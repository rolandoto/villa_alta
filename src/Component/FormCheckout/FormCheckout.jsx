import React, { useEffect } from "react"
import CardCheckout from "../CardCheckout/CardCheckout"
import FormValues from "../FormValues/FormValues"
import { useSelector } from "react-redux"
import UseHotelActions from "../../Actions/useHotelsActions"
import logopse from "../../Image/pse.png"
import FormValuesPse from "../FormValues/FormValuesPse"
const FormCheckout=({Country,handleSubmit,loading,formErrors,handleChange,formValues,cart,subtotal,paymentMethod,setPaymentMethod,handleChangePse,formValuesPse}) =>{


    const {hotelList,loadingHotel,errorHotel,banks}= useSelector((state) => state.Hotel)
    const {getListHotel,getListBanks} =UseHotelActions()

    const fetchDate =async() =>{
      await getListHotel()
      await getListBanks()
    }

    useEffect(() =>{
      fetchDate()
    },[])


    return (<div className= "bg-gray-100 " >
                <div className="flex justify-center   min-h-screen">
                    <div className="bg-white mt-12  p-6 rounded-lg shadow-lg w-full max-w-7xl">
                    <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-xl font-semibold mb-4">Datos del Huésped</h2>
                    <div className="mb-6 pb-4 border-b border-gray-200 space-y-4">
                        <label
                        htmlFor="payment-credit"
                        className="flex items-center  cursor-pointer justify-between  bg-white border rounded-xl p-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
                        >
                        <div className="flex items-center gap-3">
                            <input
                            id="payment-credit"
                            type="radio"
                            name="payment"
                            value="CREDITO"
                            checked={paymentMethod === 'CREDITO'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-800 font-semibold">
                            Tarjeta de Crédito,Tarjetas débito
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">AE</span>
                            <span className="bg-blue-900 text-yellow-400 text-xs font-bold px-2 py-1 rounded-md">VISA</span>
                          
                        </div>
                        </label>
                            <label
                                htmlFor="payment-pse"
                                className="flex items-center justify-between cursor-pointer  bg-white border rounded-xl p-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                            <div className="flex items-center gap-3">
                                <input
                                    id="payment-pse"
                                    type="radio"
                                    name="payment"
                                    value="PSE"
                                    checked={paymentMethod === 'PSE'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-800 font-semibold">PSE</span>
                                </div>
                                <span className="bg-blue-700 cursor-pointer text-white text-xs font-bold px-3 py-1 rounded-md">
                                    PSE
                                </span>
                                </label>
                                {paymentMethod === 'CREDITO' && (
                                <div className="pt-2">
                                    <FormValues
                                    loading={loading}
                                    handleSubmit={handleSubmit}
                                    formErrors={formErrors}
                                    handleChange={handleChange}
                                    formValues={formValues}
                                    Country={Country}
                                    />
                                </div>
                                )}
                               {paymentMethod === 'PSE' && (
                                    <FormValuesPse
                                        loading={loading}
                                        handleSubmit={handleSubmit}
                                        formErrors={formErrors}
                                        handleChange={handleChangePse}
                                        formValues={formValuesPse}
                                        Country={Country}
                                        banks={banks}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg">
                            <div className="p-6 border border-gray-300 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Resumen de tu reserva</h2>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold">Villa alta guest house</h3>
                                        <p className="text-gray-600">Centro Histórico, CL Callejon De Los Estribos, Cartagena, Colombia 130001</p>
                                    </div>
                                    {cart.map((itemCardRoom,e) =>(
                                    <CardCheckout key={e}   {...itemCardRoom} />
                                ))}
                                <div className=" border-gray-300 rounded-lg">
                                <div className="text-right items-center">
                                    <p className="text-sm text-gray-600 mb-1">Total de la reserva</p>
                                    <p className="text-2xl font-bold mb-2">${parseInt(subtotal).toLocaleString('es-CO')} cop</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
            </div>)
}

export default FormCheckout