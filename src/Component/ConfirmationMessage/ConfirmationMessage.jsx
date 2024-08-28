import React from "react"
import { IconFaCheckCircle } from "../Icons/Icons"

const ConfirmationMessage  =({title}) =>{

    return (
        <div className="flex items-center justify-center ">
                <div className="max-w-md p-8  g">
                  <div className="flex justify-center mb-6">
                    <IconFaCheckCircle color={"#22c55e"} />
                  </div>
                  <div className="bg-green-100 rounded-lg p-4 ">
                    <p className=" text-2xl font-lora text-center text-green-600">
                        {title}
                    </p>
                    <p className=" rounded-lg text-2xl font-lora text-center text-green-600">
                    ¡Te esperamos!
                    </p>
                  </div>
                  
                
                </div>
              </div>
    )
}
export default  ConfirmationMessage 