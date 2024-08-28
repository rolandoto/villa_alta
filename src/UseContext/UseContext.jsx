import React, {useState} from 'react'
import { addDays} from 'date-fns';
import moment from "moment";

const Autoconext = React.createContext({})

export const AutoProvider =({children}) =>{
    
    const [contextMenuPosition, setContextMenuPosition] = useState(false);
    const [adults, setAdults] = useState(2);
    const [childrem, setChildrem] = useState(0);

    const totalCountAdults = adults + childrem;

    const handChangeAdults = () => {
      setAdults(adults + 1);
    }
    
    const handChangeChildrem = () => {
      setChildrem(childrem + 1);
    }
    
    const handDecreaseAdults = () => {
      if (adults > 1) {
        setAdults(adults - 1);
      }
    }
    
    const handDecreaseChildren = () => {
      if (childrem > 0) {
        setChildrem(childrem - 1);
      }
    }
  
    const [state, setState] = useState([
      {
        startDate: null,
        endDate: null,
        key: 'selection',
        showDateDisplay: true,
        color: 'transparent',
      }
    ]);
  
    const handleSelect = (ranges) => {
      const { startDate, endDate } = ranges.selection;
      setState([
        {
          startDate,
          endDate,
          key: 'selection',
          color: startDate && endDate ? '#f97316' : 'transparent', // Solo asigna color si ambas fechas son válidas
        },
      ]);
    
      
      if (startDate && !endDate) {
        console.log("Seleccione fecha inicio");
      } else if (startDate && endDate) {
        console.log("Seleccione fecha final");
      }
    };
  
    const getClassNameForDate = (date) => {
      const { startDate, endDate } = state[0];
      
      // Define las clases para el texto
      if (startDate && endDate) {
        if (date >= startDate && date <= endDate) {
          return 'text-white'; // Color de texto blanco y fondo azul, ajusta según tu estilo
        }
      } else if (startDate && date.getTime() === startDate.getTime()) {
        return 'text-white '; // Color de texto blanco y fondo azul, ajusta según tu estilo
      } else if (endDate && date.getTime() === endDate.getTime()) {
        return 'text-white '; // Color de texto blanco y fondo azul, ajusta según tu estilo
      }
    
      return 'text-black'; // Color de texto negro predeterminado
    };
    
    
  
    return <Autoconext.Provider value={{  
                                    state,
                                    handleSelect,
                                    setContextMenuPosition,
                                    contextMenuPosition,
                                    getClassNameForDate,
                                    adults,
                                    childrem,
                                    handChangeAdults,
                                    handChangeChildrem,
                                    handDecreaseAdults,
                                    handDecreaseChildren,
                                    totalCountAdults

                                }}>
      {children}
    </Autoconext.Provider>
  }
  
  export default Autoconext