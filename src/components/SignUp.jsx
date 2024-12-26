import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, Loading, Logo } from "./index.js";
import { createAccount, userLogin } from "../store/Slices/auth.slice";
import GetImagePreview from "./GetImagePreview.jsx";

function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const password = watch("password"); // Watch the "password" field

  const submit = async (data) => {
    console.log(data);
    const response = await dispatch(createAccount(data));
    if (response?.payload?.success) {
      const username = data?.username;
      const password = data?.password;
      const login = await dispatch(userLogin({ username, password }));
      if (login?.type === "login/fulfilled") {
        navigate("/home");
      } else {
        navigate("/login");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center mt-10 sm:mt-7">
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
          {/* Avatar and Cover Image */}
          <div className="w-full relative h-28 mt-5 bg-slate-600">
            <div className="w-full h-full hover:bg-slate-900 roun">
              <GetImagePreview
                name="coverImage"
                control={control}
                className="w-full h-28 object-cover border-none border-slate-900"
                cameraIcon={true}
                cameraSize={30}
              />
              <div className="text-white absolute right-2 bottom-2">
                coverImage
              </div>
            </div>
            <div className="absolute left-2 bottom-2 rounded-full border-2 hover:bg-slate-700">
              <GetImagePreview
                name="avatar"
                control={control}
                className="object-cover rounded-full h-20 w-20 border-none outline-none"
                cameraIcon={true}
                cameraSize={20}
              />
            </div>
          </div>
          {errors?.avatar && (
            <div className="text-red-500 text-md text-center">
              {errors?.avatar?.message}
            </div>
          )}
          {/* Username */}
          <Input
            label={"Username : "}
            placeholder={"Enter Username"}
            type={"text"}
            className="h-8"
            {...register("username", { required: "Username is required" })}
          />
          {errors?.username && (
            <span className="text-red-500 text-md">
              {errors?.username?.message}
            </span>
          )}

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

          {/* Full Name */}
          <Input
            label={"Full Name : "}
            placeholder={"Enter Full Name"}
            type={"text"}
            className="h-8"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors?.fullName && (
            <span className="text-red-500 text-md">
              {errors?.fullName?.message}
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

          {/* Confirm Password */}
          <Input
            label={"Confirm Password : "}
            placeholder={"Confirm Password"}
            type={"password"}
            className="h-8"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
          />
          {errors?.confirmPassword && (
            <span className="text-red-500 text-md">
              {errors?.confirmPassword?.message}
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

export default SignUp;
