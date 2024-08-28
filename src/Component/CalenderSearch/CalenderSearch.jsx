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
        <MainAccomodationRoomSearch className=" lg:flex  mt-[68px]  mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
            <MainProduct className="mx-auto lg:flex opacity-80  bg-white  items-center justify-between  rounded-full shadow-2xl ">
                            <BorderInputInitial className="flex flex-col hover-punter "  onClick={HandClickMenu}>
                                    <span className="mb-2 ml-8 font-bold text-[#24262b]" >Check-in :</span>
                                    <span className="ml-8" >  {formattedStartDateToString === 'fecha inválida' ? '-- / -- / --' : formattedStartDateToString}</span>
                            </BorderInputInitial>
                            <BorderInput className="flex flex-col  hover-punter" onClick={HandClickMenuEnd}>
                                    <span className="ml-8 mb-2 font-bold text-[#24262b]">Check-out :</span>
                                    <span className="ml-8 mb-2" >{formattedEndDateToString === 'fecha inválida' ? '-- / -- / --' : formattedEndDateToString}</span>
                            </BorderInput>
                        
                            <BorderInput className="flex flex-col hover-punter" onClick={HandClickMenuPeople}  >
                                <span className="ml-8 mb-2 font-bold text-[#24262b] ">Personas:</span>
                                <span className="ml-8 mb-2" >{totalCountAdults} </span>
                            </BorderInput>
                            <ContainerButtonSearch className="flex flex-col ">
                                <ButtonSearch className=" lg:hidden mr-4  block  w-full bg-black text-white py-4    rounded-full hover:bg-[ff7a45px] transition duration-200" onClick={onsubmit}>
                                        Search
                                </ButtonSearch>

                                <ButtonSearch className=" hidden  mr-4    p-4 lg:block w-[150px]   bg-black text-white py-4     rounded-full  hover:bg-[ff7a45px] transition duration-200" onClick={onsubmit}>
                                Search
                                </ButtonSearch>
                            </ContainerButtonSearch>
            </MainProduct>
            </MainAccomodationRoomSearch>    
    )
}

export default CalenderSearch