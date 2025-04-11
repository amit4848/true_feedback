'use client';
import { verifySchema } from '@/schemas/verifySchema';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import * as z  from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/Apiresponse';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const VerifyAccount=()=> {
    const router = useRouter()
    const params=useParams<{username:string}>()
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: '',
          }
        
      });
      const onSubmit = async (data:z.infer<typeof verifySchema >)=>{
         try{
            const response=await axios.post(`/api/verify-code`,{
                username:params.username,
                code:data.code
            })                                  
            toast.success("Success!", {
                description: response.data.message
              });
            router.replace('sign-in')
         }catch(error){
            console.error('Error during sign-up:', error);    
            const axiosError = error as AxiosError<ApiResponse>;
              
            // Default error message
            const errorMessage =
                    axiosError.response?.data.message ??
                    "There was a problem with your sign-up. Please try again.";
              
            
            toast.error("Sign Up Failed", {description: errorMessage,});
         }
      }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="code">Verification Code</FormLabel>
                  <Input id="code" {...field} placeholder="code" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default VerifyAccount
