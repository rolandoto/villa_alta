import React from "react";


const Somethingwrong =() =>{

    return (<>
           <div className="flex flex-col  justify-center min-h-screen bg-gray-100">
    <div className="relative w-full h-48">
        <img
            src="https://digital.ihg.com/is/image/ihg/ihg-404-error-hero-mobile" // Reemplaza con la ruta correcta de tu imagen
            alt="Door hanger"
            className="object-cover w-full h-full"
        />
    </div>
    <div className="bg-white w-full text-center py-8">
        <h2 className="text-3xl font-semibold mb-2">Page not found</h2>
        <p className="text-gray-700 mb-4">
            Please check the URL or select from the options below.
        </p>
        <div className="space-y-2">
            <button className="w-full max-w-xs py-2 px-4 bg-orange-600 text-white rounded-md mx-auto">
                Make a Reservation
            </button>
            <button className="w-full max-w-xs py-2 px-4 text-orange-600 border border-orange-600 rounded-md mx-auto">
                Explore Destinations
            </button>
            <button className="w-full max-w-xs py-2 px-4 text-orange-600 mx-auto">
                IHG One Rewards
            </button>
        </div>
    </div>
</div>

            </>)

}
export default Somethingwrong