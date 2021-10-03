import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <div className="fixed w-full h-14 z-40 top-0 bg-white">
        <div className="w-full h-14 flex justify-between items-center py-3">
          <Link href="/">
            <div className="flex h-full justify-center items-center cursor-pointer">
              <img src="/easycite-logo.png" alt="Logo" className="h-full " />
              <span className="ml-2 text-xl font-semibold cursor-pointer">
                Easy Cite
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
