import React, { useRef, useState } from "react";

/**
 * Props:
 * - onUpload(file: File) => Promise<string|object>  // should return uploaded URL or result
 * - accept (string) optional (default "image/*")
 * - maxSize (bytes) optional
 * - label (string) optional
 */
export default function FileUpload({
  onUpload,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  label = "Choose File",
}) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [error, setError] = useState(null);

  const handleChoose = () => inputRef.current?.click();

  const handleFile = (f) => {
    setError(null);
    if (!f) return;
    if (maxSize && f.size > maxSize) {
      setError(`File too large — max ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
      setFile(null);
      setPreview(null);
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const onInputChange = (e) => {
    const f = e.target.files?.[0];
    handleFile(f);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }
    if (!onUpload) {
      setError("No upload handler provided");
      return;
    }

    try {
      setStatus("uploading");
      const result = await onUpload(file);
      setStatus("success");
      // keep preview (caller might return new URL via settings hook)
      return result;
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Upload failed");
      throw err;
    }
  };

  const handleRemoveLocal = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={onInputChange}
        aria-hidden="true"
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleChoose}
          className="ff-btn px-4 py-2"
          aria-label="Choose file"
        >
          {label}
        </button>

        <button
          type="button"
          onClick={handleUpload}
          className="ff-btn px-4 py-2"
          disabled={!file || status === "uploading"}
          aria-label="Upload file"
        >
          {status === "uploading" ? "Uploading…" : "Upload"}
        </button>

        {file && (
          <button
            type="button"
            onClick={handleRemoveLocal}
            className="ff-btn px-3 py-2 bg-white/10"
            aria-label="Remove selected file"
          >
            Remove
          </button>
        )}
      </div>

      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Selected preview"
            className="w-28 h-28 rounded-full object-cover border border-white/10"
          />
        </div>
      )}

      {status === "success" && (
        <p className="text-sm text-green-300" role="status" aria-live="polite">
          Uploaded successfully
        </p>
      )}

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}