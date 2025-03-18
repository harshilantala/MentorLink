import React, { useState, useRef } from "react";
import { Paperclip } from 'lucide-react';

const SimpleEditor = ({
  value,
  onChange,
  isAutofocus = false,
  minHeight = "120px",
  placeholder = "Write something..."
}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  
  const handleTextChange = (e) => {
    if (onChange) {
      // Assuming your postBody is an object with body property
      onChange({
        ...value,
        body: e.target.value
      });
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="simple-editor border rounded-lg overflow-hidden">
      {/* Text area */}
      <textarea
        className="w-full px-4 py-3 outline-none resize-none"
        placeholder={placeholder}
        value={value?.body || ""}
        onChange={handleTextChange}
        autoFocus={isAutofocus}
        style={{ minHeight }}
      />
      
      {/* File preview area */}
      {files.length > 0 && (
        <div className="file-previews p-2 border-t bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center bg-white rounded px-2 py-1 text-sm">
                <span className="truncate max-w-[150px]">{file.name}</span>
                <button 
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => removeFile(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer with file upload */}
      <div className="editor-footer flex items-center p-2 border-t">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          multiple
        />
        <button 
          type="button" // Important to prevent form submission
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => fileInputRef.current.click()}
        >
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default SimpleEditor;