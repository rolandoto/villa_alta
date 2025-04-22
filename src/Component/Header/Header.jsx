import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionSearch } from "../../Ui/Style/GeneralStyle";
import { RxHamburgerMenu } from "react-icons/rx";
import { Menu, X } from "lucide-react"; // o usa tu ícono preferido


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

    const [isOpen, setIsOpen] = useState(false);


    return (
      <header className="bg-black font-serif text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div className="text-white text-[32px] sm:text-[40px] font-bold tracking-widest">
          <Link to="/">Villa Alta</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-base font-light">
          <Link to="/Accomodation" className="text-[25px] text-white">
            Reservar
          </Link>
          <Link to="/Gallery" className="text-[25px] text-white">
            Galería
          </Link>
        </nav>
        <nav className="hidden md:flex space-x-8 text-base font-light">
          
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

     

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-black text-white text-lg">
          <Link
            to="/Accomodation"
            className="block"
            onClick={() => setIsOpen(false)}
          >
            Reservar
          </Link>
          <Link
            to="/Gallery"
            className="block"
            onClick={() => setIsOpen(false)}
          >
            Galería
          </Link>
        </div>
      )}
    </header>
    )

}

export default Header