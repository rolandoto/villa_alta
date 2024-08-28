import React, { useEffect } from "react";
import CardEvents from "../CardEvents/CardEventjs";
import UseEventsActions from "../../Actions/useEventsActions";
import { useSelector } from "react-redux";

const Events =()  =>{
  const {getevents}= useSelector(state => state.Events);
  const {getEvents} =UseEventsActions()    

    const fetchDate =async() =>{
        await getEvents({id:4})
    }

    useEffect(() =>{
        fetchDate()
    },[])

    return (
        <>
         <div     className="   mx-auto max-w-7xl p-6" >
                <h1 className="text-[30px] text-center text-orange-500  font-lora  mb-6">Próximos eventos en Medellín</h1>
                <div className="grid sm:grid-cols-1  gap-5   md:grid-cols-2 ">  
                      {getevents.map((item,e ) => (
                         <CardEvents key={e} {...item} />
                      ))}
              </div>
            </div>
        </>
    )
}
export default Events