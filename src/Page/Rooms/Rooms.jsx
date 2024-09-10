import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";



const ApartmentCard = ({ image, title, subtitle, description, index }) => {
    return (
      <div className="relative flex flex-col items-center text-center p-4">
        <img src={image} alt={title} className="rounded-lg mb-8 shadow-lg" />
        <h3 className="text-lg font-semibold">{title}</h3>
        <h4 className="text-sm font-light mb-2">{subtitle}</h4>
        <p className="text-gray-700">{description}</p>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
          {index.toString().padStart(2, '0')}
        </div>
      </div>
    );
  };
  

  const CurvedLine = () => (
    <svg className="absolute -top-8 left-1/2 transform -translate-x-1/2" width="100" height="100">
      <path d="M10,90 C40,10 60,10 90,90" stroke="gray" strokeWidth="2" fill="none" />
    </svg>
  );

const Rooms =() =>{

    const apartments = [
        {
          image: 'https://cms.kiinliving.com/uploads/attachments/clthsing301ug6hqsg7uqgxiw-apto-sl.webp',
          title: 'STUDIO',
          subtitle: 'LOFT',
          description: 'The Studio Loft is a cozy and modern space, designed to provide comfort and functionality in one place.',
        },
        {
          image: 'https://cms.kiinliving.com/uploads/attachments/clthsing301ug6hqsg7uqgxiw-apto-sl.webp',
          title: 'APT. 1-1',
          subtitle: '',
          description: 'Modern one-bedroom, one-bathroom suite, ideal for those seeking privacy and comfort.',
        },
        {
          image: 'https://cms.kiinliving.com/uploads/attachments/clthsing301ug6hqsg7uqgxiw-apto-sl.webp',
          title: 'APT. 2-2',
          subtitle: '',
          description: 'This Suite offers two bedrooms and two bathrooms, perfect for sharing with friends and family.',
        },
        {
          image: 'https://cms.kiinliving.com/uploads/attachments/clthsing301ug6hqsg7uqgxiw-apto-sl.webp',
          title: 'APT. 2-2',
          subtitle: 'DELUXE',
          description: 'The Suite 2-2 Deluxe offers two bedrooms and two bathrooms, with a 24m² balcony for outdoor relaxation.',
        },
      ];
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 800) {
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
    const [menuOpen, setMenuOpen] = useState(false);

    return  <>
    <div className="bg-[#bebba9]" >

   
      <header
        className={`fixed z-50 top-0 left-0 right-0 transition-colors duration-300 ${
          scrolled ? "bg-[#8f592c] text-white" : "bg-transparent text-white"
        }`}
      >
        <nav className="border-b p-2 border-white flex justify-between items-center space-x-6 max-w-[97%] mx-auto">
          <div className="text-2xl sm:text-3xl font-lora"><Link to="/"  > Hotel Gallery</Link> </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-[15px] hover:underline">
            HABITACIONES
            </a>
            <a href="#" className="text-[15px]hover:underline">
            COMODIDADES
            </a>
            <a href="#" className="text-[15px] hover:underline">
              EVENTOS
            </a>
          
          </div>
          <button className="bg-black text-white rounded-full px-3 sm:px-4 py-2 text-xs sm:text-base">
            COMO LLEGAR
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <span>Menu</span>
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-[#8f592c] text-white py-2">
            <a href="#" className="block px-4 py-2 hover:bg-[#a36a33]">
              Habitaciones
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-[#a36a33]">
              AMENITIES
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-[#a36a33]">
              KIIN
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-[#a36a33]">
              BLOG
            </a>
          </div>
        )}
      </header>
    
      <section className=" py-12">
        <h2 className="text-4xl font-semibold text-center mb-8">Apartments</h2>
        <div className="flex justify-center gap-8">
            {apartments.map((apartment, index) => (
            <ApartmentCard
                key={index}
                image={apartment.image}
                title={apartment.title}
                subtitle={apartment.subtitle}
                description={apartment.description}
                index={index + 1}
            />
            ))}
        </div>
        </section>
        </div>
            </>
}

export default Rooms