import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import Verdict from "../assets/DVerdict__1_-removebg-preview (1).png";
const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div>
        <Link to="/">
          <img src={Verdict} alt="Dverdict" className="w-32 h-18" />
        </Link>
        {/* <img
          src={Verdict}
          alt="DVerdict"
          height={18}
          width={18}
          href="/"
          className="w-32 cursor-pointer"
        /> */}
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4 text-white">
        {["Add Case", "Register Lawyer", "Register Judge"].map(
          (item, index) => (
            <li key={index}>
              <Link
                to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
                className="hover:text-gray-300"
              >
                {item}
              </Link>
            </li>
          )
        )}
        <li>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md"
          >
            Login
          </Link>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {toggleMenu ? (
          <HiX
            fontSize={28}
            className="text-white cursor-pointer"
            onClick={handleClick}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white cursor-pointer"
            onClick={handleClick}
          />
        )}
      </div>

      {/* Mobile Menu Items */}
      {toggleMenu && (
        <div className="absolute top-0 right-0 bg-gray-800 p-4 flex flex-col space-y-4">
          {[
            "Add Case",
            "Register Lawyer",
            "Register Judge",
            // "Register User",
          ].map((item, index) => (
            <Link
              key={index}
              to={`/${item.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-white hover:text-gray-300"
              onClick={handleClick}
            >
              {item}
            </Link>
          ))}
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md text-white"
            onClick={handleClick}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
