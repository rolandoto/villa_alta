import React from "react"
import CardRoomDetail from "../CardRoomDetail/CardRoomDetail"
import { Fragment } from "react"

const RoomDetail =({rooms}) =>{

    return (
        <div className="py-12 px-4  ">
            <div className="container max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-normal text-center text-[#ff7a45]  font-lora mb-8">Nuestras habitaciones</h2>
                <p className="text-gray-700 mb-8">
                    Cada habitación está decorada con obras de artistas locales, creando un ambiente único e inspirador.
                </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        {rooms.map((room, index) => (
                            <Fragment>
                                <CardRoomDetail {...room}
                                                key={index} />
                                  
                            </Fragment>
                          
                        ))}
                    </div>
            </div>
        </div>
      )

}

export default RoomDetail