import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    reservation:false,
    Country:[],

    loadingCountry:false,
    loading:false,

    error:null,
    erroRcountry:null
}

export const ApiCreateByidHotel = createSlice({
    name:"ApiCreateByidHotel",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error= null
        },
        setCreateReservation:(state,action) =>{
            state.reservation = action.payload
            state.loading= false
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        },

        loadingCountry:(state) =>{
            state.loadingCountry=true
            state.erroRcountry= null
        },
        setCountry:(state,action) =>{
            state.Country = action.payload
            state.loadingCountry= false
        },
        setErrorCountry:(state) =>{
            state.loadingCountry = false
            state.erroRcountry = true
        }
    }   
})

export const {loading,setCreateReservation,setError,loadingCountry,setCountry,setErrorCountry} = ApiCreateByidHotel.actions

export default  ApiCreateByidHotel.reducer