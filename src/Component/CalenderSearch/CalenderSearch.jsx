import React from "react";
import { BorderInput, BorderInputInitial, ButtonSearch, ContainerButtonSearch, MainAccomodation, MainAccomodationRoomSearch, MainProduct } from "../../Ui/Style/GeneralStyle";
import { FiArrowRight } from "react-icons/fi";

const CalenderSearch =({HandClickMenuPeople,
                        HandClickMenuEnd
                        ,HandClickMenu,
                        onsubmit,
                        formattedStartDateToString,
                        formattedEndDateToString,
                        totalCountAdults}) =>{
                   

    return (
       
            <MainProduct className=" mt-[90px] m-auto lg:flex block   ">
                        <BorderInputInitial className=" flex text-start flex-col hover-punter "  onClick={HandClickMenu}>
                        <span className="  font-bold   " >Llegada :</span>
                        <span className=" " >  {formattedStartDateToString === 'fecha inválida' ? '-- / -- / --' : formattedStartDateToString}</span>
                        </BorderInputInitial>
                        <BorderInput className="flex flex-col  text-start  hover-punter" onClick={HandClickMenuEnd}>
                        <span className=" font-bold">Salida :</span>
                        <span className="   " >{formattedEndDateToString === 'fecha inválida' ? '-- / -- / --' : formattedEndDateToString}</span>
                        </BorderInput>
                        <BorderInput className="flex flex-col  text-start  hover-punter"  onClick={HandClickMenuPeople} >
                        <span className=" font-bold">Huesped :</span>
                        <span className="  " >{totalCountAdults}</span>
                        </BorderInput>
                        <ContainerButtonSearch  className="  ">
                                        <ButtonSearch className=" lg:hidden justify-center  items-center    flex  cursor-pointer z-40   w-full bg-black text-white py-4    rounded-full  transition duration-200" onClick={onsubmit}>
                                                Reservar <FiArrowRight fontSize={25}/>
                                        </ButtonSearch>
                                        <ButtonSearch className=" justify-center  items-center lg:flex hidden cursor-pointer    p-4 lg:block  w-[150px]   bg-black  text-white py-4     rounded-full   transition duration-200" onClick={onsubmit}>
                                        
                                        Reservar  <FiArrowRight fontSize={23}/>
                                        </ButtonSearch>
                            </ContainerButtonSearch>
            </MainProduct>
        
    )
}

export default CalenderSearch