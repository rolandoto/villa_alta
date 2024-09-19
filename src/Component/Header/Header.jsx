import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionSearch } from "../../Ui/Style/GeneralStyle";
import { RxHamburgerMenu } from "react-icons/rx";


const Header =() =>{

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrolledbook, setScrolledBook] = useState(false);
      
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setScrolled(true);
        } if(window.scrollY > 200){
          setScrolledBook(true)
        } else {
          setScrolled(false);
          setScrolledBook(false)
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    return (
        <SectionSearch  >
        <header
           className={`fixed z-50 top-0 left-0 right-0 transition-colors duration-300 ${
             scrolled ? "bg-[#4141416c] text-white" : "bg-[#4141416c] text-white"
           }`}
         >
           <nav className="border-b p-2 border-white flex justify-between items-center space-x-6 max-w-[97%] mx-auto">
             <div className="text-2xl sm:text-3xl font-lora"><Link to="/"  > Hotel Gallery</Link> </div>
             <div className="hidden md:flex space-x-6">
               <Link to="/Rooms" className="text-[15px] hover:underline">
               HABITACIONES
               </Link>
               <a href="#" className="text-[15px]hover:underline">
               COMODIDADES
               </a>
               <Link to="/Events" className="text-[15px] hover:underline">
             PRÓXIMOS EVENTOS
           </Link>
             
             </div>
             <a  
              target="_blank"
              href="https://www.google.com/maps/dir//Gallery+Hotel+Medell%C3%ADn,+Cl.+47+%2341-55,+La+Candelaria,+Medell%C3%ADn,+La+Candelaria,+Medell%C3%ADn,+Antioquia/@6.2405494,-75.5638233,14z/data=!4m9!4m8!1m0!1m5!1m1!1s0x8e4428575a0dc0d1:0xbc26f43cbd055cc8!2m2!1d-75.5631796!2d6.2437756!3e0?entry=ttu"
             className="bg-black text-white rounded-full px-3 sm:px-4 py-2 text-xs sm:text-base">
              
               COMO LLEGAR
             </a>
             <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
               <RxHamburgerMenu color="white" fontSize={25} />
             </button>
           </nav>
          {menuOpen && (
              <div className="md:hidden bg-[#4141416c] text-white py-2">
              <Link to="/Rooms" className="block px-4 py-2 ">
              HABITACIONES
              </Link>
            
              <a href="#" className="block px-4 py-2 ">
              COMODIDADES
              </a>
              <Link to="/Events" className="block px-4 py-2  text-[15px] hover:underline">
                    PRÓXIMOS EVENTOS
                  </Link>
                    
            </div>
          )}
        </header>         
     </SectionSearch>
    )

}

export default Header