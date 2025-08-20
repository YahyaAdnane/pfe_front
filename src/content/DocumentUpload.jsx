// src/components/DocumentUpload.jsx
import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [documentInfo, setDocumentInfo] = useState(null);

  const handleFileChange = (e) => {
    setError("");
    setDocumentInfo(null);
    setFile(e.target.files[0] || null);
  };

const { token } = useAuth();

  console.log("Token from auth provider:", token); // 👈 voir ce qui est renvoyé

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    

    setUploading(true);
    setError("");
    try {
      // Get the token you saved at login
      if (!token) throw new Error("Not authenticated");

      // Build form data
      const formData = new FormData();
      formData.append("file", file);

      // Send the request
      const res = await fetch("http://localhost:5143/api/document", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: do NOT set Content-Type here; the browser will add the correct multipart boundary
        },
        body: formData,
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || res.statusText);
      }

      // Parse and display the JSON response
    const json = JSON.parse(text);
      setDocumentInfo(json.id);
    } catch (err) {
      console.error("Upload error:", err.message);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center", display: "flex" }}>
      <input style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center", display: "flex" }} type="file" accept="application/pdf" onChange={handleFileChange} />
      <br />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        {uploading ? "Uploading…" : "Upload"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
      )}

      {documentInfo && (
        <div style={{ marginTop: "1rem", textAlign: "left" }}>
          <p>Document Created</p>
          <pre
            style={{
              background: "#070101",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(documentInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
