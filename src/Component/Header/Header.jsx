import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header =({scrollToRoomSectionEvent}) =>{

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    return (
            <nav className=" w-full z-40 items-center fixed p-3 bg-black shadow-md">
                    <div  className="  mx-auto flex items-center   justify-between   max-w-7xl" > 
                    <div className="text-3xl font-bold text-indigo-600">
                    <Link to="/">
                        <img 
                        className="w-[100px]" 
                        src="https://github.com/rolandoto/image-pms/blob/main/Logo-Gallery-Colores.png?raw=true" 
                        alt="Logo de Gallery Hotel" 
                        width="100" 
                        height="100"
                        />
                    </Link>
                    </div>

                    <div className=" hidden lg:block   space-x-4">
                        <Link to="/" className="text-white cursor-pointer text-[16px] font-normal  hover:text-[#ff7a45]"  >Inicio</Link>
                        <Link to="/Events" className="text-white cursor-pointer text-[16px] font-normal hover:text-[#ff7a45]"   >Próximos eventos</Link>
                        <Link to="/Accomodation" className="text-white  cursor-pointer text-[16px] font-normal hover:text-[#ff7a45]"  >Reservas</Link>
                    </div>
                    <div className="hidden lg:block " >
                        <a 
                         target="_blank"
                         href="https://www.google.com/maps/dir//Gallery+Hotel+Medell%C3%ADn,+Cl.+47+%2341-55,+La+Candelaria,+Medell%C3%ADn,+La+Candelaria,+Medell%C3%ADn,+Antioquia/@6.2405494,-75.5638233,14z/data=!4m9!4m8!1m0!1m5!1m1!1s0x8e4428575a0dc0d1:0xbc26f43cbd055cc8!2m2!1d-75.5631796!2d6.2437756!3e0?entry=ttu"
                        className="text-white bg-orange-500 w-[150px] p-4 rounded hover:bg-orange-600">Cómo llegar</a>
                    </div>

                    <div className="lg:hidden" >
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                    </div>

                  
            </div>

           {menuOpen &&  <div className="lg:hidden flex flex-col mt-4 space-y-2">
                            <Link to="/" className="text-white text-[16px] font-normal  hover:text-[#ff7a45]" >
                                Inicio
                            </Link>
                            <Link to="/Events" className="text-white text-[16px] font-normal  hover:text-[#ff7a45]"  >
                                Próximos eventos
                            </Link>
                            <Link  to="/Accomodation" className="text-white text-[16px] font-normal  hover:text-[#ff7a45]" >
                                Reservas
                            </Link>
                            <a  target="_blank"
                                href="https://www.google.com/maps/dir//Gallery+Hotel+Medell%C3%ADn,+Cl.+47+%2341-55,+La+Candelaria,+Medell%C3%ADn,+La+Candelaria,+Medell%C3%ADn,+Antioquia/@6.2405494,-75.5638233,14z/data=!4m9!4m8!1m0!1m5!1m1!1s0x8e4428575a0dc0d1:0xbc26f43cbd055cc8!2m2!1d-75.5631796!2d6.2437756!3e0?entry=ttu"
                                className="text-white bg-orange-500 w-full p-4 rounded hover:bg-orange-600"   
                            >
                                Cómo llegar
                            </a>
                        </div>
                }
        </nav>  
    )

}

export default Header