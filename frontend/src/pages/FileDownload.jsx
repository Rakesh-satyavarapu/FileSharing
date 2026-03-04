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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Download File</h2>

        <p style={{ marginBottom: "20px", color: "#666" }}>
          Enter the access code provided to download your file
        </p>

        <input
          type="text"
          placeholder="Enter access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            fontSize: "14px",
          }}
        />

        <button
          onClick={handleDownload}
          style={{
            width: "100%",
            padding: "10px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Download File
        </button>

        {error && (
          <p
            style={{
              marginTop: "15px",
              color: "red",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileDownload;