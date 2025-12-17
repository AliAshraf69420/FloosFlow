import React, { useState, useRef } from "react";
import userService from "../../../services/userService";
import { useUser } from "../../../context/UserContext";

export default function FileUpload() {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage || "https://via.placeholder.com/150");
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage("Please select an image file");
      setStatusMessage("");
      return;
    }

    // Validate file size (5MB max)
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
    if (!selectedFile) {
      setErrorMessage("No file selected");
      return;
    }

    setUploading(true);
    setStatusMessage("");
    setErrorMessage("");

    try {
      // Pass the file directly, not FormData
      const response = await userService.uploadProfileImage(selectedFile);

      setStatusMessage("Uploaded successfully!");
      setErrorMessage("");

      // Update user in context
      if (response?.user) {
        setPreviewUrl(response.user.profileImage || "../../../../assets/defaultimage.png");
      } else if (response?.profileImage) {
        setPreviewUrl(response.profileImage);
      }

      // Clear selected file after successful upload
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMessage(err.response?.data?.error || "Upload failed");
      setStatusMessage("");
    } finally {
      setUploading(false);
    }
  };

  // Remove file
  const handleRemove = async () => {
    if (!user?.profileImage) {
      setErrorMessage("No profile image to remove");
      return;
    }

    setUploading(true);
    setStatusMessage("");
    setErrorMessage("");

    try {
      await userService.deleteProfileImage();

      setSelectedFile(null);
      setStatusMessage("Removed successfully!");
      setErrorMessage("");

      // Update user in context
      setPreviewUrl("../../../../assets/defaultimage.png");

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error("Remove error:", err);
      setErrorMessage(err.response?.data?.error || "Remove failed");
      setStatusMessage("");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-hidden="true"
        onChange={handleFileChange}
      />

      <div className="flex items-center flex-wrap gap-3">
        <button
          type="button"
          className="ff-btn px-4 py-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          Choose File
        </button>

        <button
          type="button"
          className="ff-btn px-4 py-2 bg-gradient-to-r from-[#62A6BF] to-[#49EB8C]"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <button
          type="button"
          className="ff-btn px-3 py-2 bg-red-500/20 hover:bg-red-500/30"
          onClick={handleRemove}
          disabled={!user?.profileImage || uploading}
        >
          Remove
        </button>
      </div>

      <div className="mt-2">
        <img
          src={previewUrl}
          alt="Profile preview"
          className="w-28 h-28 rounded-full object-cover border-2 border-white/20"
          onError={() => setPreviewUrl("../../../../assets/defaultimage.png")}
        />
        {selectedFile && (
          <p className="text-xs text-white/60 mt-2">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>

      {statusMessage && (
        <p className="text-sm text-green-400 font-medium">{statusMessage}</p>
      )}
      {errorMessage && (
        <p className="text-sm text-red-400 font-medium">{errorMessage}</p>
      )}
    </div>
  );
}