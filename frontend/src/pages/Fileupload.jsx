import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const expiryOptions = [
  { label: "1 hour", value: 1 },
  { label: "1 day", value: 24 },
  { label: "7 days", value: 168 }
];

const downloadOptions = [
  { label: "Unlimited", value: 999999 },
  { label: "1", value: 1 },
  { label: "5", value: 5 }
];

const FileUpload = () => {

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [file, setFile] = useState(null);
  const [expiryHours, setExpiryHours] = useState(24);
  const [maxDownloads, setMaxDownloads] = useState("");
  const [customExpiry, setCustomExpiry] = useState("");
  const [customDownloads, setCustomDownloads] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  const handleSubmit = async () => {

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const expiry = customExpiry || expiryHours;
    const downloads = customDownloads || maxDownloads;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("expiryHours", expiry);
    formData.append("maxDownloads", downloads);

    setLoading(true);

    try {

      const res = await fetch(`${API_URL}/api/files/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      setMessage(`Access Code: ${data.accessCode}`);

    } catch {
      setMessage("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="vault-container">

      {/* Title */}
      <h1 className="vault-title">
        Upload <span>File</span>
      </h1>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`vault-dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />

        {file ? (
          <p>{file.name}</p>
        ) : (
          <>
            <p>Drop file here</p>
            <span>or click to browse</span>
          </>
        )}
      </div>

      {/* Settings Row */}
      <div className="settings-row">

        {/* Expiry */}
        <div className="options-section">
          <h3>Expires After</h3>

          <div className="options-grid">
            {expiryOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`option-btn ${
                  expiryHours === opt.value ? "active" : ""
                }`}
                onClick={() => {
                  setCustomExpiry("");
                  setExpiryHours(opt.value);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Custom hours"
            className="custom-input"
            value={customExpiry}
            onChange={(e) => setCustomExpiry(e.target.value)}
          />

        </div>

        {/* Downloads */}
        <div className="options-section">
          <h3>Max Downloads</h3>

          <div className="options-grid">
            {downloadOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`option-btn ${
                  maxDownloads === opt.value ? "active" : ""
                }`}
                onClick={() => {
                  setCustomDownloads("");
                  setMaxDownloads(opt.value);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Custom limit"
            className="custom-input"
            value={customDownloads}
            onChange={(e) => setCustomDownloads(e.target.value)}
          />

        </div>

      </div>

      {/* Upload Button */}
      <button
        onClick={handleSubmit}
        className="generate-btn"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Generate Code"}
      </button>

      {message && <p className="upload-message">{message}</p>}

    </div>
  );
};

export default FileUpload;