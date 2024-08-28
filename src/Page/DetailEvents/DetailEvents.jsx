import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { useSelector } from "react-redux";
import UseEventsActions from "../../Actions/useEventsActions";
import WhatsappButton from "../../Component/WhatsappButton/WhatsappButton";

const DetailEvents =() =>{

    useEffect(() => {
        // Scrolls to the top of the document on component mount
        window.scrollTo(0, 0);
    }, []);

    let { userId } = useParams();

    const {geteventsDetail,loadinggetEventsDetail,errorgetEventsDetail}= useSelector(state => state.Events);
    const {getEventsDetail} =UseEventsActions()    
  
      const fetchDate =async() =>{
          await getEventsDetail({id:userId})
      }
  
      useEffect(() =>{
          fetchDate()
      },[])
 
   const FillContent =() =>{
    if(loadinggetEventsDetail){
        return <p>...cargando</p>
    }if(errorgetEventsDetail){
        return  <div className="mx-auto max-w-4xl text-center p-6 mb-24" >
        <span className="text-2xl text-center font-mono text-black mb-4" >Evento no disponible </span>
            </div>
    }

    return <>
    <div className="mx-auto max-w-4xl p-6 mb-24">
            <h1 className="text-[30px] text-center text-[#ff7a45] font-lora  mb-6">{geteventsDetail.Name}</h1>
                <div className=" w-full p-4">
                    <img
                            src={geteventsDetail.img_events}
                            alt="Room"
                            className="w-full h-[500px] object-center rounded-lg shadow-lg" />
                </div>
                <span className="text-2xl font-lora text-black mb-4" >{geteventsDetail.Place}: </span>
                <div className=" md:pl-6 mt-8 md:mt-3">
                    <p className="text-gray-700 text-justify	 mb-4">{geteventsDetail.DescriptionEvent1}</p>
                    <ul className="list-disc ml-4   text-justify text-gray-700 ">
                    {geteventsDetail?.activities?.actividades1?.map((highlight, index) => (
                        <li key={index}><span className="text-black text-[18px]  font-lora " >{highlight?.Tipo}</span> {highlight?.Description}</li>
                    ))}
                    </ul>
                    <p className="text-[20px] text-black  font-lora  mb-3  text-justify mt-2	">
                        {geteventsDetail.DescriptionEvent2}
                    </p>
                    <ul className="list-disc ml-4   text-justify text-gray-700 ">
                    {geteventsDetail?.activities?.actividades2?.map((highlight, index) => (
                         <li key={index}><span className="text-black text-[18px]  font-lora " >{highlight?.Tipo}</span> {highlight?.Description}</li>
                    ))}
                    </ul>
                </div>
            <h1 className="text-[20px] text-black  font-lora mt-4  mb-6">{geteventsDetail.Finally}</h1>
        </div>
    </>
   
    }
    return (<>
               <Header/>
               <div className="relative bg-cover bg-center h-[410px]" style={{ backgroundImage: `url(https://github.com/rolandoto/image-pms/blob/main/_MG_4223.jpg?raw=true)`,}}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                        <h1 className="text-4xl md:text-6xl lg:text-6xl font-lora">
                           Eventos
                        </h1>
                    </div>
                </div>
                <WhatsappButton />
                {FillContent()}
              <Footer/>
            </>)

}

export default  DetailEvents