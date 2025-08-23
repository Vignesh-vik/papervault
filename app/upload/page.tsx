"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      setUrl(data.secure_url);
    } else {
      alert("Upload failed: " + JSON.stringify(data));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload a File</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleUpload}
      >
        Upload
      </button>

      {url && (
        <div className="mt-4">
          <p>✅ Uploaded:</p>
          <a href={url} target="_blank" className="text-blue-500 underline">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
