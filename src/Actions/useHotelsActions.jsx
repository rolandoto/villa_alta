import { useAppDispatch } from "../Hooks/Redux"
import { loading,setHotel,setError,setListHotel,setlistoHotelError,loadingHotel } from "../reducers/ApiHotelByIdReduccers"
import HttpClient from "../HttpClient"

const UseHotelActions =() =>{

    const dispatch =  useAppDispatch()

    const getHotel =async({propertyID,startDate,endDate,token,counPeople}) =>{
        dispatch(loading())
        try {
            const response  = await  HttpClient.getAvailableRoomTypes({propertyID,startDate,endDate,token,counPeople})
            if(response){
                dispatch(setHotel(response)) 
            }else{
                dispatch(setError("no found")) 
            }
        } catch (error) {

            dispatch(setError("no found")) 
        }
    }

    const getListHotel = async() =>{
        dispatch(loadingHotel())
        try {
            const response  = await   HttpClient.getListoHotel()
            if(response){
                dispatch(setListHotel(response)) 
            }else{
                dispatch(setlistoHotelError("no found")) 
            }
        } catch (error) {
            dispatch(setlistoHotelError("no found")) 
         
        }
    }

    
    return {
        getHotel,
        getListHotel
    }

}

export default UseHotelActions