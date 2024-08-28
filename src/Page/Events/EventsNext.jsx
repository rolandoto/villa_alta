import React, { useEffect }  from "react";
import Events from "../../Component/Events/Events";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import WhatsappButton from "../../Component/WhatsappButton/WhatsappButton";

const EventsNext =()  =>{
    useEffect(() => {
        // Scrolls to the top of the document on component mount
        window.scrollTo(0, 0);
    }, []);
    return (<>
             <Header/>
               <div className="relative bg-cover bg-center h-[410px]" style={{ 
                backgroundImage: `url(https://grupo-hoteles.com/storage/app/10/rooms/283422645-48-rooms-slider-1-Habitacion-Superior-Hotel-en-Medellin-appartments.webp)`,}}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                        <h1 className="text-4xl md:text-6xl lg:text-6xl font-lora">
                           Eventos
                        </h1>
                    </div>
                </div>
                <WhatsappButton />
            <Events />
            <Footer/>
        </>)

}

export default EventsNext