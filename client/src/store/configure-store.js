import {configureStore} from '@reduxjs/toolkit'
import userReducer from './reducer/user-reducer'

export default configureStore({
    reducer: {
        user: userReducer
    }
})
