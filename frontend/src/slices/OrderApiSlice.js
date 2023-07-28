import {apiSlice} from './apiSlice'
import { ORDERS_URL } from '../constant'



export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({

        createOrder: builder.mutation({
            query:(order) => ({
                url:ORDERS_URL,
                method:'POST',
                BODY:{...order}
            })
        })
    })
})


export const {useCreateOrderMutation} = orderApiSlice;