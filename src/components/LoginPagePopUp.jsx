import { Link } from "react-router-dom";
import {Logo , Button} from "./index.js";
import React from "react";

function LoginPagePopUp() {
  return (
    <div className=" fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-30 ">
        <div className="bg-black border border-slate-800 rounded-lg p-5 text-white text-center">
            <div className="flex flex-col gap-2 items-center mb-5">
                <Logo size={28} />
            </div>
            <p className="flex flex-col font-bold">
                Login or sign up to Continue browsing
            </p>
            <div className="flex flex-col gap-4 mt-5">
                <Link to="/login">
                    <Button className="font-semibold px-8  py-2 rounded-lg hover:bg-slate-600">Login</Button>
                </Link>
                <Link to="/signup">
                    <Button className="font-semibold px-6 py-2 rounded-lg hover:bg-slate-600 ">Sign Up</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LoginPagePopUp