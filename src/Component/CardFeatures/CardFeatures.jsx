import React from "react";

const CardFeatures =({icon,title,description}) =>{

    return (<div  className="bg-gray-100 p-6   rounded-lg  hover:bg-white  hover:shadow-lg  transition duration-150 ease-in-out">
                <div className="flex items-center ">
                    <div className="text-4xl mr-2 iconsFeature ">{icon}</div>
                    <div> <h3 className="text-xl text-justify font-bold mb-2">{title}</h3>
                    <div>
                        {description && <p className="text-gray-700 text-justify">{description}</p>}
                    </div></div>        
                </div>
            </div>)
}

export default CardFeatures