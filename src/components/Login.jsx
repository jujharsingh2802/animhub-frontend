import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Loading, Logo } from './index.js'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../store/Slices/auth.slice.js'
function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); 

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.auth?.loading)
    const submit = async (data) => {
        const { email, password } = data
        const response = await dispatch(userLogin({email, password}))
        if (response?.type === 'login/fulfilled') {
            navigate('/')
        } else {
            navigate('/login')
        }
    }
    if(loading) return <Loading />
    return (
        <div className="flex items-center sm:mr-[260px] justify-center mt-10 sm:mt-7">
          <div className="mx-auto w-full max-w-lg border-slate-600 border-[1px] rounded-md p-6">
            <div className="flex justify-center">
              <span className="inline-block w-full mt-3 max-w-[100px]">
                <Logo />
              </span>
            </div>
            <form
              className="space-y-4 p-2 text-sm w-full sm:w-196"
              onSubmit={handleSubmit(submit)}
            >
              {/* Email */}
              <Input
                label={"Email : "}
                placeholder={"Enter Email"}
                type={"email"}
                {...register("email", { required: "Email is required" })}
                className="h-8"
              />
              {errors?.email && (
                <span className="text-red-500 text-md">
                  {errors?.email?.message}
                </span>
              )}
    
              {/* Password */}
              <Input
                label={"Password : "}
                placeholder={"Enter Password"}
                type={"password"}
                {...register("password", { required: "Password is required" })}
                className="h-8"
              />
              {errors?.password && (
                <span className="text-red-500 text-md">
                  {errors?.password?.message}
                </span>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-500 text-white h-8">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      );
    }
    
    
export default Login