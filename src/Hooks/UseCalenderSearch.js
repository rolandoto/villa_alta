
import { useContext, useState } from "react"

import  AutoProvider  from "../UseContext/UseContext";

const UseCalenderSearch =() =>{

    const { state,
      handleSelect,
      setContextMenuPosition,
      contextMenuPosition,
      handChangeAdults,
      handChangeChildrem,
      handDecreaseAdults,
      handDecreaseChildren,
      totalCountAdults,
      adults,
      childrem,
      getClassNameForDate} = useContext(AutoProvider)

return {
  state,
  handleSelect,
  setContextMenuPosition,
  contextMenuPosition,
  handChangeAdults,
  handChangeChildrem,
  handDecreaseAdults,
  handDecreaseChildren,
  totalCountAdults,
  adults,
  childrem,
  getClassNameForDate
}

}

export default UseCalenderSearch