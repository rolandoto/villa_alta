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
                situado en el vibrante Parque Lleras, epicentro de la vida nocturna, la gastronomía y la cultura en Medellín. Inspirado en la rica cultura callejera de la ciudad, nuestro hotel te ofrece un espacio único, donde el arte urbano cobra vida y te invita a disfrutar de una experiencia verdaderamente memorable.
                Nuestras habitaciones, decoradas con obras de artistas locales, crean un ambiente único y acogedor que celebra la creatividad de Medellín. En nuestra terraza, ubicada en la azotea, podrás disfrutar de impresionantes vistas del Parque Lleras mientras te relajas con un cóctel artesanal. Además, nuestro restaurante te sorprenderá con una deliciosa cocina local, reinventada con un toque moderno y sofisticado.
                </p>
                <p className=" text-justify text-white	 ">
                    Nuestras habitaciones están decoradas con obras de artistas locales, creando un ambiente estimulante y acogedor. Además, contamos con una terraza en la azotea con impresionantes vistas de la ciudad, un bar donde podrás disfrutar de cócteles artesanales y un restaurante que sirve cocina local con un toque moderno.
                </p>
                </div>
            </div>
        </div>)

}

export default TitleWelcome