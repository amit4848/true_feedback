import {z} from 'zod'

export const messageSchema= z.object({
    content:z
    .string()
    .min(5,{message:'Content must be at least of 5 characters'})
    .max(300,{message:'Content must be at most of 300 characters'})
    
})