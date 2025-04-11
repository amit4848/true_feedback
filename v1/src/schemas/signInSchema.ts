import {z} from 'zod'

// i place of identifier we can use username or email od user
export const signInSchema= z.object({
    identifier:z.string(),
    password: z.string()
})