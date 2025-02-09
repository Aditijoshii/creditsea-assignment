import React from "react";

const FileUpload = ({ onFileSelect, error }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
          <div className="flex flex-col items-center justify-center pt-7">
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                 viewBox="0 0 20 20"
                 fill="currentColor">
              <path fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd" />
            </svg>
            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
              Select XML file
            </p>
          </div>
          <input type="file"
                 className="opacity-0"
                 accept=".xml"
                 onChange={onFileSelect} />
        </label>
      </div>
      {error && (
        <div className="mt-4 text-red-600">{error}</div>
      )}
    </div>
  );
};

export default FileUpload;
