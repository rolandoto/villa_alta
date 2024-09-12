import React, { useCallback, useState } from "react"
import UseCalenderSearch from "../../Hooks/UseCalenderSearch";
import esLocale from 'date-fns/locale/es';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import moment from "moment";
import { IconRiCloseLargeLine } from "../Icons/Icons";
import Search from "../Search/Search";
import CalenderSearch from "../CalenderSearch/CalenderSearch";
import { useNavigate } from "react-router-dom";



const SearchGlobal =() =>{
    const navigate = useNavigate();
    const [contextShowMenuPeople, setContextShowMenuPeople] = useState(false);
    const {handleSelect,state,setContextMenuPosition,contextMenuPosition,
        handChangeAdults,
        handChangeChildrem,
        handDecreaseAdults,
        handDecreaseChildren,
        totalCountAdults,
        adults,
        childrem ,
        getClassNameForDate} =  UseCalenderSearch()


    const [checkbox,setCheckBox] =useState(false)

    const startDate = state[0]?.startDate;
    const endDate = state[0]?.endDate;
    const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD') : '';
    const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : '';
    const formattedStartDateToString = moment(state[0]?.startDate).format('DD MMM YYYY').toLowerCase();
    const formattedEndDateToString = moment(state[0]?.endDate).format('DD MMM YYYY').toLowerCase();

    const HandClickMenuPeople =() =>{
        if(contextShowMenuPeople){
          setContextShowMenuPeople(false)
        }else if(!contextShowMenuPeople){
          setContextShowMenuPeople(true)
        }
        setContextMenuPosition(false)
      }
  
      const HandClickMenu =() =>{
        if(contextMenuPosition){
          setContextMenuPosition(false)
        }else if(!contextMenuPosition){
          setContextMenuPosition(true)
        }
        setContextShowMenuPeople(false)
      }
      
      const handClickCart =() =>{
        setCheckBox(!checkbox)
     }
  
      const HandClickMenuEnd =() =>{
        if(contextMenuPosition){
          setContextMenuPosition(false)
        }else if(!contextMenuPosition){
          setContextMenuPosition(true)
        }
        setContextShowMenuPeople(false)
      }
  
      const PostHotelByIdHotel = useCallback(async () => {
        setContextMenuPosition(false);
        navigate("/Accomodation");
      }, []);
  

      const monthsToShow = window.innerWidth >= 700 ? 2 : 1;

    return <>
         <CalenderSearch  HandClickMenuPeople={HandClickMenuPeople} 
                            formattedStartDateToString={formattedStartDateToString}
                            formattedEndDateToString={formattedEndDateToString}
                            HandClickMenuEnd={HandClickMenuEnd}
                            HandClickMenu={HandClickMenu}
                            onsubmit={PostHotelByIdHotel} 
                            totalCountAdults={totalCountAdults}
                            />

<div className="hidden lg:block  ">
              {contextMenuPosition && (
                <DateRange
                  className="flex calender-search-Acoomodation lg:hidden"
                  rangeColors={["rgb(255 104 0 / 36%);"]}
                  minDate={new Date()}
                  onChange={handleSelect}
                 
                  months={2}
                  dayContentRenderer={(date) => {
                    const className = getClassNameForDate(date);
                 
                    return (
                      <div className={className}>
                        {date.getDate()}
                      </div>
                    );
                  }}
                  autoFocus
                  moveRangeOnFirstSelection={false} // No mueve el rango en la primera selección
                  showSelectionPreview={false} // Muestra la selección previa
                  startDatePlaceholder="Early"
                  showDateDisplay={false}
                  ranges={state}
                  direction="horizontal"
                  locale={esLocale}
                />
              )}
          </div>

          {contextMenuPosition &&
              <div className="  lg:hidden fixed inset-0 bg-white flex items-start justify-center z-50  md:shadow-[17px_20px_40px_rgba(0,0,0,0.21)] md:rounded-[1.25rem] md:!font-size[16px] md:!user-select-none">
                <div className="bg-white p-4  rounded-lg shadow-lg w-full h-full md:w-auto md:h-auto">
                  <button className="absolute top-4 right-4 text-black text-lg" onClick={() =>setContextMenuPosition(false)} ><IconRiCloseLargeLine />;</button>
                 <div>
                    <h2 className="text-center text-2xl font-semibold mb-4">Selecionar fecha</h2>
                    <DateRange 
                          className="flex calender-search-Acoomodation lg:hidden"
                          rangeColors={["rgb(255 104 0 / 36%);"]}
                          minDate={new Date()}
                          onChange={handleSelect}
                          editableDateInputs={false}
                          months={monthsToShow}
                          dayContentRenderer={(date) => {
                            const className = getClassNameForDate(date);
                            return (
                              <div className={className}>
                                {date.getDate()}
                              </div>
                            );
                          }}
                          autoFocus
                          moveRangeOnFirstSelection={false} // No mueve el rango en la primera selección
                          showSelectionPreview={false} // Muestra la selección previa
                          startDatePlaceholder="Early"
                          showDateDisplay={false}
                          ranges={state}
                          direction="horizontal"
                          locale={esLocale}
                      />
                     <button
                      className="mt-6 bg-black text-white px-6 py-3 rounded-lg "
                      onClick={(e) => setContextMenuPosition(false) }
                      style={{
                        position: 'absolute',
                        bottom: '20px',  // Ajusta esta propiedad según la distancia que desees del borde inferior
                        left: '50%',     // Centra el botón horizontalmente
                        transform: 'translateX(-50%)', // Ajusta la posición centrada
                      }}
                    >
                      Continuar
                    </button>
                    </div>
                 </div> 
            </div>}

            {contextShowMenuPeople &&
              <div className=" lg:hidden fixed inset-0 bg-white flex items-start justify-center z-50   md:rounded-[1.25rem] md:!font-size[16px] md:!user-select-none">
                <div className="bg-white p-4   rounded-lg  w-full h-full md:w-auto md:h-auto">
                  <button className="absolute top-4 right-4 text-black text-lg" onClick={() =>setContextShowMenuPeople(false)} ><IconRiCloseLargeLine /></button>
                        <div>
                              <h2 className="text-center text-2xl font-semibold mb-4">Selecionar adultos</h2>
                              <Search contextShowMenuPeople={contextShowMenuPeople}
                              top={715}
                              adults={adults}
                              childrem={childrem}
                              handChangeAdults={handChangeAdults}
                              handDecreaseAdults={handDecreaseAdults}
                              handChangeChildrem={handChangeChildrem}
                              handDecreaseChildren={handDecreaseChildren}
                              setContextShowMenuPeople={setContextShowMenuPeople}  />
                      </div>
                  </div> 
              </div>} 

              <div className="hidden lg:block  ">
                    {contextShowMenuPeople && 
                      <Search contextShowMenuPeople={contextShowMenuPeople}
                      top={190}
                      adults={adults}
                      childrem={childrem}
                      handChangeAdults={handChangeAdults}
                      handDecreaseAdults={handDecreaseAdults}
                      handChangeChildrem={handChangeChildrem}
                      handDecreaseChildren={handDecreaseChildren}
                      setContextShowMenuPeople={setContextShowMenuPeople}  />}
                </div>   
      
        </>

}

export default SearchGlobal