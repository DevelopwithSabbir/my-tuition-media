import React, { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  label: string;
  description: string;
  onUpload: (file: File) => void;
  currentFile?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  description,
  onUpload,
  currentFile
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG or PDF file');
      return;
    }

    if (file.size > maxSize) {
      setError('File size should be less than 5MB');
      return;
    }

    setFile(file);
    setError('');
    onUpload(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400'
        }`}
      >
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-sm text-gray-600">{description}</p>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG or PDF up to 5MB</p>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById(label)?.click()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Select file
          </button>
          <input
            id={label}
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileInput}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}

      {(file || currentFile) && !error && (
        <div className="flex items-center text-green-600 text-sm">
          <Check className="h-4 w-4 mr-1" />
          {file ? file.name : 'Document uploaded'}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;