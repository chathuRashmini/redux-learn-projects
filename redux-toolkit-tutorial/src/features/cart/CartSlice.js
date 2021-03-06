import { createSlice } from "@reduxjs/toolkit";

import cartItems from '../../cartItems'

const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
}

const cartSlice = createSlice({
    name: 'cart',

    initialState,
    
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },

        removeItem: (state, action) => {
            const itemId = action.payload

            state.cartItems = state.cartItems.filter((item) =>  item.id !== itemId )
        },

        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.amount = cartItem.amount + 1
        },

        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.amount = cartItem.amount - 1
        },

        calculateTotals: (state) => {
            let amount = 0
            let tootal = 0

            state.cartItems.forEach((item) => {
                amount += item.amount
                tootal += item.amount * item.price
            })

            state.amount = amount
            state.total = tootal
        }
    },
})

// console.log('cartSlice: ', cartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions

export default cartSlice.reducer
