
export default function FileUpload() {
  const previewUrl =
    "https://via.placeholder.com/150"; // static preview image

  return (
    <div className="flex flex-col  gap-3 ">
      <input
        type="file"
        className="sr-only"
        aria-hidden="true"
      />

      <div className="flex items-center flex-wrap sm:flex-row gap-3">
        <button
          type="button"
          className="ff-btn px-4 py-2"
          aria-label="Choose file"
        >
          Choose File
        </button>

        <button
          type="file"
          className="ff-btn px-4 py-2"
          aria-label="Upload file"
        >
          Upload
        </button>

        <button
          type="button"
          className="ff-btn px-3 py-2 bg-white/10"
          aria-label="Remove selected file"
        >
          Remove
        </button>
      </div>

      {/* Static preview */}
      {/* The backend should insert the img here */}
      <div className="mt-2">
        <img
          src={"../../../../assets/mefr.webp"}
          alt="Selected preview"
          className="w-28 h-28 rounded-full object-cover border border-white/10"
        />
      </div>

      {/* Static status messages */}
      <p className="text-sm text-green-300" role="status" aria-live="polite">
        Uploaded successfully
      </p>

      {/* <p className="text-sm text-red-400" role="alert">
        File too large — max 5MB
      </p> */}
    </div>
  );
}
