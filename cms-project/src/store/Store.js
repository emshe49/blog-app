import {configureStore} from "@reduxjs/toolkit"
import prodReducer from "../Features/prodRoute"
import authReducer from "../Features/auth"


export const store = configureStore({

reducer:{
    prod:prodReducer,
    auth:authReducer
    
}

})
