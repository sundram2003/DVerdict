// import React, { useState } from "react";
// import { HiMenuAlt4 } from "react-icons/hi";
// import { AiOutlineClose } from "react-icons/ai";
// import { Link } from "react-router-dom";
// //adding the logo

// // import logo from "../../images/logo.png";

// const NavBarItem = ({ title, classprops }) => (
//   <li className={`mx-4 cursor-pointer ${classprops}`}>
//     {/* <Link to={`/${title.toLowerCase()}`}>{title}</Link> */}
//   </li>
// );

// const Navbar = () => {
//   const [toggleMenu, setToggleMenu] = useState(false);

//   return (
//     <nav className="w-full flex md:justify-center justify-between items-center p-4">
//       <div className="md:flex-[0.5] flex-initial justify-center items-center">
//         <img src={""} alt="logo" className="w-32 cursor-pointer" />
//       </div>
//       {
//         <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
//           {["Add to Case", "Register Lawyer", "Register", "Wallets"].map(
//             (item, index) => (
//               <NavBarItem key={item + index} title={item} />
//             )
//           )}
//           <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
//             Login
//           </li>
//         </ul>
//       }
//       <div className="flex relative">
//         {!toggleMenu && (
//           <HiMenuAlt4
//             fontSize={28}
//             className="text-white md:hidden cursor-pointer"
//             onClick={() => setToggleMenu(true)}
//           />
//         )}
//         {toggleMenu && (
//           <AiOutlineClose
//             fontSize={28}
//             className="text-white md:hidden cursor-pointer"
//             onClick={() => setToggleMenu(false)}
//           />
//         )}
//         {toggleMenu && (
//           <ul
//             className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
//             flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
//           >
//             <li className="text-xl w-full my-2">
//               <AiOutlineClose onClick={() => setToggleMenu(false)} />
//             </li>
//             {["Add Case", "Register Lawer", "Register Judge", "Wallets"].map(
//               (item, index) => (
//                 <NavBarItem
//                   key={item + index}
//                   title={item}
//                   classprops="my-2 text-lg"
//                 />
//               )
//             )}
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div>
        <img src={""} alt="logo" className="w-32 cursor-pointer" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4 text-white">
        {["Add Case", "Register Lawyer", "Register Judge", "Wallets"].map(
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
          {["Add Case", "Register Lawyer", "Register Judge", "Wallets"].map(
            (item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-gray-300"
                onClick={handleClick}
              >
                {item}
              </Link>
            )
          )}
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
