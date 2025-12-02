import React from "react";

export default function ParentCard({ title, children }) {
  return (
    <div className="group ff-card-transaction p-8 lg:p-12 text-left mx-auto w-full max-w-5xl hover:bg-white/10">
      {title && (
        <h1 className="text-4xl font-bold mb-10 text-center text-white/90">
          {title}
        </h1>
      )}
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}
