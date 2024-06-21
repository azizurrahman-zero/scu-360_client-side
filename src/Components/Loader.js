import React from "react";

const Loader = () => {
  return (
    <div className="fixed left-1/2 top-1/2 w-[90px] h-[90px] z-[1] bg-no-repeat bg-center bg-contain bg-loader translate-x-[-50%] translate-y-[-50%] after:absolute after:w-[120px] after:h-[120px] after:rounded-full after:m-[-15px] after:shadow-[0_4px_0_0_#be261a] after:transition-all after:duration-1000 after:ease-linear after:animate-[loader_1s_linear_infinite]">
      <div></div>
    </div>
  );
};

export default Loader;
