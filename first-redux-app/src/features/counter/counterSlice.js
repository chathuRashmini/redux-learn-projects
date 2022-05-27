import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',

    initialState,

    reducers: {
        increment: (state) => {
            state.count += 1
            console.log("state.count: ", state.count)
        },
        decrement: (state) => {
            state.count -= 1
            console.log("state.count: ", state.count)
        },
        reset: (state) => {
            state.count = 0
            console.log("state.count: ", state.count)
        },

        incrementByAmount: (state, action) => {
            state.count += action.payload
            console.log("state.count: ", state.count)
        }
    }
})

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
