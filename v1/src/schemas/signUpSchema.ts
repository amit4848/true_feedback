import {z} from 'zod'

// here username contain only name so don't need to write z.object
export const usernameValidation= z
        .string()
        .min(2,"Username must be atleast 2 characters")
        .max(20,"Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")


export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:'Invalid email address'}),
    password:z.string().min(6,{message:'password must be at least 6 characters'})
})

