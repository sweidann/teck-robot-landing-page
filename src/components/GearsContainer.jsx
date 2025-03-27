import React from "react";
import { gearImage1 } from "../vars/vars";

const GearsContainer = ({ gear2, gear3, gear4, rotation }) => {
  return (
    <div
      className={`gears-container relative w-[450px] h-[450px] md:w-[450px] md:h-[450px] xl:w-[500px] xl:h-[500px] mx-auto ${rotation} `}
    >
      <img
        src={gearImage1}
        className="absolute top-[-50px] left-[-50px] z-[1]"
      />
      <img
        src={gear2}
        className="absolute top-[-50px] right-[-100px] md:top-[40px] md:right-[-150px]"
      />
      <img
        src={gear4}
        className="absolute bottom-[-50px] right-[-70px] md:bottom-[-100px] md:right-[-120px]"
      />
      <img
        src={gear3}
        className="absolute bottom-[-100px] left-[00px] md:bottom-[-150px] md:left-[80px] rotate-[60]"
      />
    </div>
  );
};

export default GearsContainer;
