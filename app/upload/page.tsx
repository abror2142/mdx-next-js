'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ImageUploaderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
      setUploadedPath(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const { data } = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedPath(data.filePath);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div className="mt-4">
          <img src={previewUrl} alt="Preview" className="w-full h-auto rounded" />
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        disabled={!file || uploading}
        onClick={handleUpload}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadedPath && (
        <div className="mt-4">
          <p>Uploaded to:</p>
          <a href={uploadedPath} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {uploadedPath}
          </a>
        </div>
      )}
    </div>
  );
}