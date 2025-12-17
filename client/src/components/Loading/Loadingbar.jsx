import React from "react";

export default function LoadingBar() {
    return (
        <>
            <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20 relative">
                <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] rounded-full animate-[loading_1.5s_infinite_ease-in-out]"></div>
            </div>
            <style>{`
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
        }
      `}</style>
        </>
    );
}
