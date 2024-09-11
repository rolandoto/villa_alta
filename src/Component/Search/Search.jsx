import React from "react";
import { CiCirclePlus,CiCircleMinus  } from "react-icons/ci";
import {  StyleGroup, StyleNumberPeople, StyleSpan, StyleTitleHotel, StyledContextTyeHotel, StyledMenuItem, StyledMenuItemButton, StyledMenuItemNumber  } from "../../Ui/Style/GeneralStyle";

const Search =({contextShowMenuPeople,
                setContextShowMenuPeople,
                top,
                adults,
                childrem,
                handChangeAdults,
                handChangeChildrem,
                handDecreaseAdults,
                handDecreaseChildren}) =>{

    return(<> 
      
                  <StyledContextTyeHotel className="fade-in" valid={true}  top={top} left={100} >
                  <StyledMenuItem>
                    <StyleTitleHotel className="text-black">Adultos</StyleTitleHotel>
                    <StyleGroup>
                    <StyledMenuItemNumber>
                      <StyleSpan onClick={handDecreaseAdults} > <CiCircleMinus color="black"  fontSize={50} /> </StyleSpan>
                        <StyleNumberPeople className="text-black" maxlength="30" disabled={true} value={adults} minLength={2} min="0" placeholder="0" />
                        <StyleSpan onClick={handChangeAdults}  > <CiCirclePlus color="black" fontSize={50} /> </StyleSpan>
                        </StyledMenuItemNumber>
                    </StyleGroup>
                  </StyledMenuItem>
                  <StyledMenuItemButton>
                      <button
                          onClick={() => setContextShowMenuPeople(false)}
                          className=" Button-Search w-[150px] bg-black text-white py-2  rounded hover:bg-black transition duration-200">
                          Buscar
                      </button>
                  </StyledMenuItemButton>   
              </StyledContextTyeHotel>
      </>
    )

}

export default Search