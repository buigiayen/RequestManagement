import { jsonSystemData } from "@/data/text/json.text";
import React from "react";

const HeaderNavbar = () => {
  return (
    <div className="bg-[#202637] text-[white]  text-[10px] flex items-center justify-center h-[20px] ">
      {jsonSystemData.title.toUpperCase()}
    </div>
  );
};

export default HeaderNavbar;
