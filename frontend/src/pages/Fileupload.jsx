import React, { useState } from "react";

const FileUpload = () => {

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);
    formData.append("expiryHours", e.target.expiryHours.value);
    formData.append("maxDownloads", e.target.maxDownloads.value);

    try {
      const response = await fetch(`${API_URL}/api/files/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setMessage(`Access Code: ${data.accessCode}`);
    } catch (error) {
      setMessage("Upload failed");
    }

    setLoading(false);
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
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Upload Secure File
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Choose File</label>
            <input
              type="file"
              name="file"
              required
              style={{ width: "100%", marginTop: "6px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Expiry Time (hours)</label>
            <input
              type="number"
              name="expiryHours"
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Max Downloads</label>
            <input
              type="number"
              name="maxDownloads"
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
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
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#e0f2fe",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;