import React, { useState } from 'react';

const FileUpload = () => {

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);
    formData.append("expiryHours", e.target.expiryHours.value);
    formData.append("maxDownloads", e.target.maxDownloads.value);

    try {
      const response = await fetch("http://localhost:8080/api/files/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      setMessage(`Access Code: ${data.accessCode}`);

    } catch (error) {
      setMessage("Upload failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload File</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" name="file" required /><br /><br />

        <input 
          type="number" 
          name="expiryHours" 
          placeholder="Expiry Hours" 
          required 
        /><br /><br />

        <input 
          type="number" 
          name="maxDownloads" 
          placeholder="Max Downloads" 
          required 
        /><br /><br />

        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;