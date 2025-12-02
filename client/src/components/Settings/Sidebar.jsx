import React from "react";

export default function Sidebar() {
  return (
    <nav aria-label="Settings sections" className="ff-sidebar fixed top-1/2 left-8 -translate-y-1/2 w-64 h-[360px]">
      <ul className="flex flex-col space-y-4">
        <li><a href="#profile" className="block px-4 py-2 rounded-md text-white font-bold hover:ff-gradient">Profile</a></li>
        <li><a href="#theme" className="block px-4 py-2 rounded-md text-white font-bold hover:ff-gradient">Theme</a></li>
        <li><a href="#personal" className="block px-4 py-2 rounded-md text-white font-bold hover:ff-gradient">Personal Information</a></li>
        <li><a href="#account" className="block px-4 py-2 rounded-md text-red-500 font-bold">Account Settings</a></li>
      </ul>
    </nav>
  );
}