import React from "react";
import { Link } from "react-router-dom";

function Logo({ width = "36px" }) {
  return (
    <>
      <Link to={"/"} className="flex gap-2 items-center">
        <img
          width={width}
          alt="Logo"
          src="/images/logo.png"
          className="object-contain invert hover:invert-0"
        />
        <div className="font-bold text-white">
          <span className=" hover:text-yellow-400">A</span>
          <span className=" hover:text-yellow-400">N</span>
          <span className=" hover:text-yellow-400">I</span>
          <span className=" hover:text-yellow-400">M</span>
          <span className=" hover:text-yellow-400">H</span>
          <span className=" hover:text-yellow-400">U</span>
          <span className=" hover:text-yellow-400">B</span>
        </div>
      </Link>
    </>
  );
}

export default Logo;
