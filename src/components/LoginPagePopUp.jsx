import { Link } from "react-router-dom";
import {Logo , Button} from "./index.js";
import React from "react";

function LoginPagePopUp() {
  return (
    <div className=" fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-30 ">
        <div className="bg-black border border-slate-800 rounded-lg p-5 text-white text-center">
            <div className="flax flex-col gap-2 items-center mb-10">
                <Logo size={28} />
            </div>
            <p>
                Login or sign up to Continue browsing
            </p>
            <div className="flex gap-4 mt-5">
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
                <Link to="/signup">
                    <Button>Sign Up</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LoginPagePopUp