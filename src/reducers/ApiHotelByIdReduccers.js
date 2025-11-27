import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    hotel:[],
    loading:false,
    error:null,
    
    hotelList:[],
    loadingHotel:false,
    errorHotel:null,

    RoomsType:[],
    LoadingRoomTypes:false,
    ErrorRoomTypes:false,

    banks: [],
    loadingBanks: false,
    errorBanks: null,

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
        //RoomsTypes
        loadingRoomsTypes:(state) =>{
            state.LoadingRoomTypes=true
            state.ErrorRoomTypes= null
        },
        setRoomsTypes:(state,action) =>{
            state.RoomsType = action.payload
            state.LoadingRoomTypes= false
        },
        setErrorRoomsTypes:(state,action) =>{
            state.LoadingRoomTypes = false
            state.ErrorRoomTypes = true
        },

        loadingBanks: (state) => {
            state.loadingBanks = true;
            state.errorBanks = null;
        },
        setListBanks: (state, action) => {
            state.banks = action.payload;
            state.loadingBanks = false;
        },
        setListBanksError: (state, action) => {
            state.loadingBanks = false;
            state.errorBanks = true;
        },

    }
})

export const {  loading,
                setHotel,
                setError,
                loadingHotel,
                setListHotel,
                setlistoHotelError,
                loadingRoomsTypes,
                setRoomsTypes,
                setErrorRoomsTypes,
                loadingBanks,
                setListBanks,
                setListBanksError} = ApiHotelByIdReduccers.actions

export default  ApiHotelByIdReduccers.reducer