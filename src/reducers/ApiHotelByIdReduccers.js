import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    hotel:[],
    loading:false,
    error:null,
    
    hotelList:[],
    loadingHotel:false,
    errorHotel:null
}

export const ApiHotelByIdReduccers = createSlice({
    name:"Tarifas",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error= null
        },
        setHotel:(state,action) =>{
            state.hotel = action.payload
            state.loading= false
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        },

        //get list hotel
        loadingHotel:(state) =>{
            state.loadingHotel=true
            state.errorHotel= null
        },
        setListHotel:(state,action) =>{
            state.hotelList = action.payload
            state.loadingHotel= false
        },
        setlistoHotelError:(state,action) =>{
            state.loadingHotel = false
            state.errorHotel = true
        },
    }
})

export const {loading,setHotel,setError,loadingHotel,setListHotel,setlistoHotelError} = ApiHotelByIdReduccers.actions

export default  ApiHotelByIdReduccers.reducer