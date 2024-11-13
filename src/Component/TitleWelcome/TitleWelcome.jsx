import React from "react"


const TitleWelcome  =() =>{

    return (
        <div className="w-full ">
            <div className="flex flex-col     mx-auto max-w-7xl  md:flex-row items-center  p-4">
               <div className="md:w-1/2 p-4">
               <img
                    src="https://grupo-hoteles.com/storage/app/7/rooms/2060649073-38-rooms-slider-1-lleras-medellin-estandar.webp"
                    alt="Room"
                    className="w-full h-auto rounded-3xl shadow-2xl"
                />
                    </div>
                <div className="md:w-1/2 p-4">
                    <h2 className="text-3xl font-normal text-white mb-4 font-lora text-[30px] text-center ">¡Parque Lleras!</h2>
                <p className="text-justify text-white	 mb-4">
                ¿Buscas un lugar cómodo y tranquilo para descansar después de disfrutar la vibrante vida nocturna del Parque Lleras?  
                </p>
                <p className=" text-justify text-white	 ">
                Ubicado en el corazón del vibrante Parque Lleras, el Hotel Lleras Park Concept ofrece un espacio ideal para aquellos que buscan disfrutar de la vida nocturna de Medellín y, al mismo tiempo, un lugar acogedor y cómodo para descansar. Nuestras habitaciones están diseñadas para cubrir diferentes necesidades, desde estancias individuales hasta opciones amplias para grupos, ofreciendo una excelente relación calidad-precio en una de las zonas más activas de la ciudad.
                </p>

               
                </div>
            </div>
        </div>)

}

export default TitleWelcome