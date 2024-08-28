import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    RoomsPromotions:true,
    loadingRoomsProtions:false,
    errorRoomsProtions:null,

    RoomsGetPromotions:[],
    loadingGetRoomsProtions:false,
    errorGetRoomsProtions:null
}
export const ApiRoomsPromotionReducers = createSlice({
    name:"RoomPromotion",
    initialState,
    reducers:{
        loadingRoomsPromtions:(state) =>{
            state.loadingRoomsProtions=true
            state.errorRoomsProtions= null
        },
        setErrorRoomsPromtions:(state) =>{
            state.loadingRoomsProtions = true
            state.errorRoomsProtions = false
        },
        setRoomsPromtions:(state,action) =>{
            state.RoomsPromotions =true
            state.loadingGetRoomsProtions= false
        },


        loadingGetRoomsPromtions:(state) =>{
            state.loadingGetRoomsProtions=true
            state.errorGetRoomsProtions= null
        },
        setErrorGetRoomsPromtions:(state) =>{
            state.loadingGetRoomsProtions = true
            state.errorGetRoomsProtions = false
        },
        setRoomsGetPromtions:(state,action) =>{
            state.RoomsGetPromotions =action.payload
            state.loadingGetRoomsProtions= false
        },
    }
})

export const {  loadingRoomsPromtions,
                setErrorRoomsPromtions,
                setRoomsPromtions,

                loadingGetRoomsPromtions,
                setErrorGetRoomsPromtions,
                setRoomsGetPromtions
                
            } = ApiRoomsPromotionReducers.actions

export default  ApiRoomsPromotionReducers.reducer