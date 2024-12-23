import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {useNavigate, Link, data} from 'react-router-dom'
import {login} from "../store/authSlice"
import {Button, Input, Logo} from "./index"
import  {useDispatch, useSelector} from "react-redux"
import {useForm} from 'react-hook-form'


function SignUp() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
         setError("")

         try {
            const userData = await authService.createAccount(data)
            const loggedData = await authService.getCurrentUser()
            if (loggedData) {
                    dispatch(login(loggedData))
                    console.log("hmm why not")
                    navigate("/")
            }
         } catch (error) {
            setError(error.message)
         }
    }

  return (
    <div
    className='flex items-center justify-center'
    >
        <div 
            className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'
        >
            <div
                    className='mb-2 flex justify-center'
                >
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
            </div>

            <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign up to create a account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already Have an account ?
                    <Link
                        to={"/login"}
                        className='font-medium transition-all duration-200 hover:underline'
                        >
                            Login
                        </Link>
                </p>
                {
                    error && (<p className='text-red-600 mt-8 text-center'>
                        {error}
                    </p>)
                }

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input 
                            label = "Full Name: "

                            placeholder = "Enter your full name"
                            {...register("name", {
                                required : true,
                            })}
                        />

                        <Input 
                            label = "Email: "
                            placeholder = "Enter Your Email"
                            type = "email"
                            {...register("email", {
                                required : true,
                                validate : {
                                    matchPattern : (value) =>   
                                       /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) || "Email Address must be valid"
                                    
                                }
                            })}
                        />

                        <Input 
                            placeholder = "Enter Your Password"
                            label = "Password"
                            type = "password"
                            {...register("password", {
                                required : true,
                            })}
                        />

                        <Button type="submit" className = "w-full">
                            Create Account
                        </Button>
                    </div>

                </form>

        </div>
    </div>
  )
}

export default SignUp