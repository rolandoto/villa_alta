import React from "react"
import pdf from "../../Image/LLERASPARK.pdf"
import { FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const FooterAccomodation =() =>{

    return (
        <footer className="bg-white font-serif text-gray-600 py-12  border-t">
            <div className=" mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Dirección */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-4xl md:text-5xl mb-6">VILLA ALTA</h2>
                    <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#f2ecd9]" />
                        <span>
                        Centro Histórico, CL Callejon De Los Estribos, Cartagena, Colombia 130001
                        </span>
                    </div>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-4xl md:text-5xl mb-6">CONTACTO</h3>
                    <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <FaPhoneAlt className="text-[#f2ecd9]" />
                        <a href="tel:+573215062187" className="text-lg  transition-colors">
                        +57 321 5062187
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdEmail className="text-[#f2ecd9]" />
                        <a href="mailto:reservas@selvario36hotel.com" className="text-lg  transition-colors">
                            hotelvillaaltac@gmail.com
                        </a>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-4xl md:text-5xl mb-6">SOCIAL</h3>
                    <a
                    href="https://www.instagram.com/villaalta.ctg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg  transition-colors"
                    >
                    <FaInstagram className="text-[#f2ecd9]" />
                    @villaalta.ctg
                    </a>
                </div>
                </div>
                <div className="mt-16 text-center text-lg text-neutral-400">
                <p>
                    © 2025 VILLA ALTA. TODOS LOS DERECHOS RESERVADOS.
                    <a href={pdf} className="ml-1 underline hover:text-[#f2ecd9]">
                    TÉRMINOS Y CONDICIONES
                    </a>
                </p>
                </div>
        </div>
        </footer>
    )
}
export default FooterAccomodation

