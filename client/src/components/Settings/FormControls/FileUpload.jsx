import React, { useState, useRef } from "react";
import userService from "../../../services/userService";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("https://via.placeholder.com/150");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File too large — max 5MB");
      setStatusMessage("");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMessage("");
    setStatusMessage("");
  };

  // Upload file
  const handleUpload = async () => {
    if (!selectedFile) return setErrorMessage("No file selected");
    try {
      await userService.uploadProfileImage(selectedFile);
      setStatusMessage("Uploaded successfully");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Upload failed");
      setStatusMessage("");
    }
  };

  // Remove file
  const handleRemove = async () => {
    try {
      await userService.deleteProfileImage();
      setSelectedFile(null);
      setPreviewUrl("https://via.placeholder.com/150"); // Reset to placeholder
      setStatusMessage("Removed successfully");
      setErrorMessage("");
      fileInputRef.current.value = null; // reset input
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Remove failed");
      setStatusMessage("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        aria-hidden="true"
        onChange={handleFileChange}
      />

      {/* Buttons */}
      <div className="flex items-center flex-wrap sm:flex-row gap-3">
        <button
          type="button"
          className="ff-btn px-4 py-2"
          onClick={() => fileInputRef.current.click()}
          aria-label="Choose file"
        >
          Choose File
        </button>

        <button
          type="button"
          className="ff-btn px-4 py-2"
          onClick={handleUpload}
          aria-label="Upload file"
        >
          Upload
        </button>

        <button
          type="button"
          className="ff-btn px-3 py-2 bg-white/10"
          onClick={handleRemove}
          aria-label="Remove selected file"
        >
          Remove
        </button>
      </div>

      {/* Preview */}
      <div className="mt-2">
        <img
          src={previewUrl}
          alt="Selected preview"
          className="w-28 h-28 rounded-full object-cover border border-white/10"
        />
      </div>

      {/* Status / error messages */}
      {statusMessage && (
        <p className="text-sm text-green-300" role="status" aria-live="polite">
          {statusMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
