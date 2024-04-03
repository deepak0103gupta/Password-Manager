import React from "react";

function Footer() {
  return (
    <div className='bg-purple-500 text-white flex flex-col justify-center items-center  bottom-0 left-0 right-0'>
      <div className="logo font-bold text-2xl">
        <span className="text-purple-800">&lt;</span>
        Pass
        <span className="text-purple-800">Op/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with<img width={50} src="icons/heart.png" className="w-6 mx-1" />by Deepak Gupta
      </div>
    </div>
  );
}

export default Footer;
