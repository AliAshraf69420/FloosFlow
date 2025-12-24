import React from "react";
import LoadingBar from "../components/Loading/Loadingbar";
import LoadingTitle from "../components/Loading/LoadingTitle";

export default function LoadingPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] text-center" role="region" aria-live="polite">
          <h2 className="sr-only">Loading content, please wait...</h2>  {/* Visually hidden heading for screen readers */}
          <LoadingTitle aria-live="assertive" />
          <div role="progressbar" aria-live="polite" aria-labelledby="loading-bar">
              <LoadingBar id="loading-bar" />
          </div>
      </div>

    );
}