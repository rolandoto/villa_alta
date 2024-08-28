
import {configureStore } from '@reduxjs/toolkit'
import {ApiHotelByIdReduccers} from '../reducers/ApiHotelByIdReduccers';
import {CartReduccers} from '../reducers/CartReduccers';
import {ApiCreateByidHotel} from '../reducers/ApiCreateByidHotel';
import {Eventseduccers} from '../reducers/ApiEventsReduccers';
import {ApiRoomsPromotionReducers} from '../reducers/ApiRoomsPromotion';

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("redux", JSON.stringify(store.getState()));
};

const store = configureStore ({
    reducer:{
        Hotel:ApiHotelByIdReduccers.reducer,
        Cart:CartReduccers.reducer,
        Reservation:ApiCreateByidHotel.reducer,
        Events:Eventseduccers.reducer,
        RoomsPromotios:ApiRoomsPromotionReducers.reducer
        },
    devTools:true,
    middleware: [persistanceLocalStorageMiddleware],
})

export const RootState = store.getState

export const  AppDispatch = typeof store.dispatch

export default store
