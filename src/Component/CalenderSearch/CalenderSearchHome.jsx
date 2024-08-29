import React from "react";
import { BorderInput, BorderInputInitial, ButtonSearch, ContainerButtonSearch, MainAccomodation, MainProduct } from "../../Ui/Style/GeneralStyle";

const CalenderSearchHome =({HandClickMenuPeople,
                        HandClickMenuEnd
                        ,HandClickMenu,
                        onsubmit,
                        formattedStartDateToString,
                        formattedEndDateToString,
                        totalCountAdults}) =>{

    return (
        <MainAccomodation className=" z-40  flex   mx-auto   max-w-5xl items-center justify-between p-4 lg:px-8">
            <MainProduct className="mx-auto flex opacity-80 bg-white  items-center justify-between  rounded-full shadow-2xl ">
                            <BorderInputInitial className="flex text-start flex-col hover-punter "  onClick={HandClickMenu}>
                            <span className="mb-2 ml-8 font-bold text-[#24262b]" >Check-in :</span>
                            <span className="ml-8 tex text-[#24262b] " >  {formattedStartDateToString === 'fecha inválida' ? '-- / -- / --' : formattedStartDateToString}</span>
                            </BorderInputInitial>
                            <BorderInput className="flex flex-col  text-start  hover-punter" onClick={HandClickMenuEnd}>
                            <span className="ml-8 mb-2 font-bold text-[#24262b]">Check-out :</span>
                            <span className="ml-8 mb-2 text-[#24262b]" >{formattedEndDateToString === 'fecha inválida' ? '-- / -- / --' : formattedEndDateToString}</span>
                            </BorderInput>

                            <BorderInput className="flex text-start flex-col hover-punter" onClick={HandClickMenuPeople}  >
                            <span className="ml-8 mb-2 font-bold text-[#24262b] ">Personas:</span>
                            <span className="ml-8 mb-2 text-[#24262b]" >{totalCountAdults} </span>
                            </BorderInput>
                            <ContainerButtonSearch  className="  ">
                                    <ButtonSearch className=" lg:hidden mr-4  cursor-pointer z-40 block  w-full bg-black text-white py-4    rounded-full hover:bg-[ff7a45px] transition duration-200" onClick={onsubmit}>
                                                Search
                                        </ButtonSearch>
                                        <ButtonSearch className=" hidden  mr-4 cursor-pointer    p-4 lg:block w-[150px]   bg-black text-white py-4     rounded-full  hover:bg-[ff7a45px] transition duration-200" onClick={onsubmit}>
                                        Search
                                        </ButtonSearch>
                            </ContainerButtonSearch>
            </MainProduct>
            </MainAccomodation>    
    )
}

export default CalenderSearchHome