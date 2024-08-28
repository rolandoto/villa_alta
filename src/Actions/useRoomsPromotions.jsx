import { useAppDispatch } from "../Hooks/Redux"
import HttpClient from "../HttpClient"
import {toast} from "sonner"
import {setRoomsPromtions,
        setErrorRoomsPromtions,
        loadingRoomsPromtions,
        
        loadingGetRoomsPromtions,
        setErrorGetRoomsPromtions,
        setRoomsGetPromtions
        } from "../reducers/ApiRoomsPromotion"

const useRoomsPromotions =() =>{
   
    const dispatch =  useAppDispatch()

    const PostRoomsPromotions =async({days}) =>{
        dispatch(loadingRoomsPromtions())
        try {
            const response  = await HttpClient.PostRoomPromotions({days})
            if(response){
                dispatch(setRoomsPromtions(response)) 
              
            }else{
                dispatch(setErrorRoomsPromtions("no found")) 
               
            }
        } catch (error) {
            dispatch(setErrorRoomsPromtions("no found")) 
          
        }
    }

    const GetRoomsPromotions =async({id}) =>{
        dispatch(loadingGetRoomsPromtions())
        try {
            const response  = await HttpClient.GetRoomsPromtions({id})
            if(response){
                dispatch(setRoomsGetPromtions(response)) 
               
            }else{
                dispatch(setErrorGetRoomsPromtions("no found")) 
            }
        } catch (error) {
            dispatch(setErrorGetRoomsPromtions("no found")) 
           
        }
    }

    return {
        PostRoomsPromotions,
        GetRoomsPromotions
    }

}

export default useRoomsPromotions