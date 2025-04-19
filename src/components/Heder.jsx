import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

export const Heder = () => {
  return (
    <>
      <div className="bg-white shadow-md w-full h-12 sm:h-15 flex justify-between items-center px-4 sm:px-10 fixed top-0 z-10">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-medium">Electric Vehicle Population</h1>
        </div>
        <div className="flex justify-end items-center gap-4 sm:gap-10 text-xl sm:text-2xl md:text-3xl">
          <IoMdSettings className="cursor-pointer text-gray-500" />
          <FaBell className="cursor-pointer text-gray-500" />
          <CgProfile className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};
