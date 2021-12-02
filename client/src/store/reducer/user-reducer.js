import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        test : (state) => {
            console.log("toto")
        },
        setUser: (state, action) => {
            console.log(state)
            console.log(action)
            state.user = action.payload
        }
    }
})

export const {setUser, test} = userSlice.actions

export default userSlice.reducer
