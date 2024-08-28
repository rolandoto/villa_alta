import React from "react";


const TitleRoom =() =>{

    return( <div className="mx-auto flex  max-w-5xl items-center justify-between p-4 lg:px-8" >
                <div className="flex  ">
                    <span className="text-[25px]  " >Nuestras Habitaciones</span> 
                </div>
                <div className="flex lg:flex-2">
            
                <select className="border border-blue-500 rounded-md">
                    <option className="border border-blue-500">Opción 1</option>
                    <option className="border border-blue-500">Opción 2</option>
                    <option className="border border-blue-500">Opción 3</option>
                    </select>

                </div>
            </div>)

}

export default TitleRoom