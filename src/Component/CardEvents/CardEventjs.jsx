import moment from "moment";
import React  from "react"
import { Link } from "react-router-dom";

const CardEvents =({ID, Name,DescriptionEvent1,Start_date,End_date,img_events}) =>{

    const end =  moment(End_date).utc().format('YYYY/MM/DD')
    const now =  moment().utc().format('YYYY/MM/DD')

    if (end >= now) {
        return ( 
            <Link 
                    to={`DetailEvents/${ID}`}
                    className="flex  cursor-pointer items-center flex-col md:flex-row p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-white hover:shadow-lg transition ease-in duration-300 "
                    >
                        <div className="md:w-1/3">
                        <img
                            src={img_events}
                            alt="Room"
                            className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                        </div>
                        <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
                            <h2 className="text-2xl  font-lora text-black mb-4">{Name}</h2>
                            <p className="text-gray-500 mb-4">{DescriptionEvent1}</p>
                        </div>
    </Link>
    )}
}

export default CardEvents