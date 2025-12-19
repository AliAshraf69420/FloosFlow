import React from "react";
import LoadingBar from "../components/Loading/Loadingbar";
import LoadingTitle from "../components/Loading/LoadingTitle";

export default function LoadingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] text-center">
            <LoadingTitle />
            <LoadingBar />
        </div>
    );
}