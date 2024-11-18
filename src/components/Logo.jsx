import React from "react";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";

function Logo({ width = "32px" }) {
  return (
    <>
      <Link to={"/"} className="flex gap-2 items-center">
        <img
          width={width}
          alt="Logo"
          src="/images/logo.png"
          className="object-contain invert"
        />
        <span className="font-bold text-white">ANIMHUB</span>
      </Link>
    </>
  );
}

export default Logo;
