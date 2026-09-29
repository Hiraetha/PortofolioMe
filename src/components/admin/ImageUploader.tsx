import React, { useState, useRef } from 'react';
import { UploadCloud, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { uploadImage } from '../../services/storage';

export interface ImageUploaderProps {
  label?: string;
  folder: 'projects' | 'achievements' | 'profile';
  value?: string | null;
  onChange: (url: string) => void;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = 'UPLOAD IMAGE ASSET',
  folder,
  value,
  onChange,
  helperText = 'Supported formats: PNG, JPG, WebP, SVG (Max 5MB)',
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setLoading(true);

    try {
      const result = await uploadImage(file, folder);
      onChange(result.url);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-foreground">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative border-2 border-border shadow-brutal-sm p-2 bg-surface flex items-center gap-4">
          <div className="w-24 h-16 sm:w-32 sm:h-20 bg-surface-muted border border-border overflow-hidden shrink-0">
            <img src={value} alt="Uploaded asset preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 font-mono text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4" /> ASSET READY
            </div>
            <p className="text-muted-foreground truncate text-[11px]">{value}</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 bg-danger text-white border-2 border-border hover:opacity-90 transition-opacity"
            title="Remove asset"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed border-border p-6 text-center cursor-pointer transition-colors ${
            dragOver ? 'bg-accent/10 border-accent' : 'bg-surface hover:bg-surface-muted'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <div className="flex flex-col items-center justify-center gap-2">
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
                <span className="font-mono text-xs font-bold text-accent">TRANSMITTING FILE...</span>
              </div>
            ) : (
              <>
                <div className="p-2.5 bg-surface-muted border border-border shadow-brutal-sm">
                  <UploadCloud className="w-6 h-6 text-foreground" />
                </div>
                <div className="font-mono text-xs font-bold text-foreground uppercase">
                  CLICK TO SELECT OR DROP IMAGE ASSET
                </div>
                <div className="font-mono text-[11px] text-muted-foreground">{helperText}</div>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs font-mono font-bold text-danger flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  );
};
