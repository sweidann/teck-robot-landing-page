import React from "react";
import { gearImage1 } from "../vars/vars";

const GearsContainer = ({ gear2, gear3, gear4, rotation }) => {
  return (
    <div
      className={`gears-container relative w-[500px] h-[500px] mx-auto ${rotation} `}
    >
      <img
        src={gearImage1}
        className="absolute top-[-50px] left-[-50px] z-[200]"
      />
      <img src={gear2} className="absolute top-[40px] right-[-150px]" />
      <img src={gear4} className="absolute bottom-[-100px] right-[-120px]" />
      <img
        src={gear3}
        className="absolute bottom-[-150px] left-[80px] rotate-[60]"
      />
    </div>
  );
};

export default GearsContainer;
