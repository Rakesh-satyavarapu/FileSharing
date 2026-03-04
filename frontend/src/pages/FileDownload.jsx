import React, { useState } from "react";

const FileDownload = () => {
  const [code, setCode] = useState("");

  const handleDownload = () => {
    if (!code.trim()) {
      alert("Enter access code");
      return;
    }
    
    window.location.href =
      `http://localhost:8080/api/files/download?code=${code}`;
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Download File</h2>

      <input
        type="text"
        placeholder="Enter 6-digit access code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default FileDownload;