import React from "react";
import { BorderInput, BorderInputInitial, ButtonSearch, ContainerButtonSearch, MainAccomodation, MainAccomodationRoomSearch, MainProduct } from "../../Ui/Style/GeneralStyle";

const CalenderSearch =({HandClickMenuPeople,
                        HandClickMenuEnd
                        ,HandClickMenu,
                        onsubmit,
                        formattedStartDateToString,
                        formattedEndDateToString,
                        totalCountAdults}) =>{
                   

    return (
       
            <MainProduct className=" mt-[90px] m-auto   ">
                        <BorderInputInitial className=" flex text-start flex-col hover-punter "  onClick={HandClickMenu}>
                        <span className=" font-bold   " >Check-in :</span>
                        <span className="  " >  {formattedStartDateToString === 'fecha inválida' ? '-- / -- / --' : formattedStartDateToString}</span>
                        </BorderInputInitial>
                        <BorderInput className="flex flex-col  text-start  hover-punter" onClick={HandClickMenuEnd}>
                        <span className=" font-bold">Check-out :</span>
                        <span className="   " >{formattedEndDateToString === 'fecha inválida' ? '-- / -- / --' : formattedEndDateToString}</span>
                        </BorderInput>
                        <BorderInput className="flex flex-col  text-start  hover-punter"  onClick={HandClickMenuPeople} >
                        <span className=" font-bold">Huesped :</span>
                        <span className="  " >{totalCountAdults}</span>
                        </BorderInput>
                        <ContainerButtonSearch  className="  ">
                        <ButtonSearch className=" lg:hidden    cursor-pointer z-40 block  w-full bg-black text-white py-4    rounded-full hover:bg-[ff7a45px] transition duration-200" onClick={onsubmit}>
                                        Search
                        </ButtonSearch>
                        <ButtonSearch className=" hidden    cursor-pointer    p-4 lg:block w-[150px]   bg-black text-white py-4     rounded-full  hover:bg-[ff7a45px] transition duration-200" onClick={onsubmit}>
                                Search
                        </ButtonSearch>
                            </ContainerButtonSearch>
            </MainProduct>
        
    )
}

export default CalenderSearch