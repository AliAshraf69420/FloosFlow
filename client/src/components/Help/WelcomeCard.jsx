import React from "react";

const WelcomeCard = () => {
  return (
    <div className="ff-card p-6 sm:p-10 flex flex-col sm:flex-row items-center text-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-[1100px] h-[200px] ">
      <img src="logo.svg" alt="Logo" className="w-36 h-36 object-contain" />
      <h1 className="text-3xl font-bold">How can we help you?</h1>
    </div>
  );
};

export default WelcomeCard;
