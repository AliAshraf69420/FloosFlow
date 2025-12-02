import React from "react";

const WelcomeCard = () => {
  return (
    <div className="ff-card p-6 sm:p-10 flex flex-col  sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-[1100px] h-[200px] ">
      <img src="../../logo.svg" alt="Logo" class="w-36 h-36 object-contain" />
      <h1 class="text-3xl font-bold text-center">Welcome to FloosFlow!</h1>
    </div>
  );
};

export default WelcomeCard;
