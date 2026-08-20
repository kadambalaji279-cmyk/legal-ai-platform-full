import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import Button from "../ui/Button";

function FileUpload({ onFileSelected, accept = ".pdf,.jpg,.jpeg,.png" }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(fileList) {
    const file = fileList?.[0];
    if (file) onFileSelected?.(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
        isDragging
          ? "border-royal bg-royal/5"
          : "border-slate-300 bg-white hover:border-royal/50"
      }`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-royal/10 text-royal">
        <UploadCloud size={22} />
      </span>

      <p className="mt-4 font-semibold text-navy">
        Drag &amp; drop your document here
      </p>
      <p className="mt-1 text-sm text-slate-500">
        or click to browse from your computer
      </p>

      <Button
        type="button"
        variant="royal"
        className="mt-5"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        <UploadCloud size={16} /> Choose File
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

export default FileUpload;
