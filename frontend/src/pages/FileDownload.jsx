import React, { useState } from "react";

const FileDownload = () => {

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleDownload = () => {

    if (!code.trim()) {
      setError("Please enter the access code");
      return;
    }

    setError("");

    window.location.href = `${API_URL}/api/files/download?code=${code}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDownload();
    }
  };

  return (
    <div className="vault-container">

      <h1 className="vault-title">
        Download <span>File</span>
      </h1>

      <p className="vault-subtitle">
        Enter the access code to download the file
      </p>

      <div className="download-box">

        <input
          type="text"
          placeholder="Enter access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyPress}
          className="download-input"
        />

        <button
          onClick={handleDownload}
          className="generate-btn"
        >
          Download File
        </button>

        {error && <p className="download-error">{error}</p>}

      </div>

    </div>
  );
};

export default FileDownload;