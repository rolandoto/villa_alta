import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    events:false,
    loadingCreateEvents:false,
    errorEvents:null,

    getevents:[],
    loadinggetEvents:false,
    errorgetEvents:null,

    geteventsDetail:[],
    loadinggetEventsDetail:false,
    errorgetEventsDetail:null
}
export const Eventseduccers = createSlice({
    name:"Events",
    initialState,
    reducers:{

        loadinggetEvents:(state) =>{
            state.loadinggetEvents=true
            state.errorgetEvents= null
        },
        setErrorgetEvents:(state) =>{
            state.loadinggetEvents = false
            state.errorgetEvents =false
        },
        setgetEvents:(state,action) =>{
            state.getevents=action.payload
            state.loadinggetEvents= false
        },

        loadinggetEventsDetail:(state) =>{
            state.loadinggetEventsDetail=true
            state.errorgetEventsDetail= null
        },
        setErrorgetEventsDetail:(state) =>{
            state.loadinggetEventsDetail = false
            state.errorgetEventsDetail =false
        },
        setgetEventsDetail:(state,action) =>{
            state.geteventsDetail=action.payload
            state.loadinggetEventsDetail= false
        },


        loadingEvents:(state) =>{
            state.loadingCreateEvents=true
            state.errorEvents= null
        },
        setErrorEvents:(state) =>{
            state.loadingCreateEvents = false
            state.errorEvents =false
        },
        setEvents:(state,action) =>{
            state.events=true
            state.loadingCreateEvents= false
        }
    }
})

export const {loadingEvents,
            setErrorEvents,
            setEvents,
            loadinggetEvents,
            setErrorgetEvents,
            setgetEvents,
            loadinggetEventsDetail,
            setErrorgetEventsDetail,
            setgetEventsDetail} = Eventseduccers.actions

export default  Eventseduccers.reducer