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
      <header className="bg-black font-serif text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className=" flex items-center justify-between px-4 md:px-8 py-4">
        <div className="text-white text-[40px] font-bold  tracking-widest">
          <Link to={"/"}>
          Villa Alta
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8 text-base font-light">
          <a href="/Accomodation" className=" text-[25px] text-white">Reservas</a>
          <a href="/Gallery" className=" text-[25px] text-white">Galería</a>
        </nav>
        <div className="flex items-center space-x-2 text-sm">
        </div>
      </div>
    </header>
    )

}

export default Header