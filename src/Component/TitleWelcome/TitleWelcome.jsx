import React from "react"


const TitleWelcome  =() =>{

    return (
        <div className="w-full bg-[#679B9B]">
            <div className="flex flex-col     mx-auto max-w-7xl  md:flex-row items-center  p-4">
               <div className="md:w-1/2 p-4">
               <img
                    src="https://grupo-hoteles.com/storage/app/4/rooms/1046121300-11-rooms-slider-1-habitacion_Aire_Hotel_en_Medellin_Gallery_Hotel-01.webp"
                    alt="Room"
                    className="w-full h-auto rounded-3xl shadow-2xl"
                />
                    </div>
                <div className="md:w-1/2 p-4">
                    <h2 className="text-3xl font-normal text-white mb-4 font-lora text-[30px] text-center ">¡Donde el arte y la hospitalidad se unen!</h2>
                <p className="text-justify text-white	 mb-4">
                    Bienvenido a Gallery Hotel, ubicado en el corazón del vibrante centro de Medellín. Inspirado en la rica cultura callejera de la ciudad, nuestro hotel ofrece un espacio único donde podrás conectarte con el arte urbano y disfrutar de una experiencia memorable.
                </p>
                <p className=" text-justify text-white	 ">
                    Nuestras habitaciones están decoradas con obras de artistas locales, creando un ambiente estimulante y acogedor. Además, contamos con una terraza en la azotea con impresionantes vistas de la ciudad, un bar donde podrás disfrutar de cócteles artesanales y un restaurante que sirve cocina local con un toque moderno.
                </p>
                </div>
            </div>
        </div>)

}

export default TitleWelcome