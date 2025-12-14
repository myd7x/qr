"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function QRUploadBox() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <motion.label
      whileHover={{ scale: 1.02 }}
      className="relative flex flex-col items-center justify-center
                 w-full h-44 rounded-xl border-2 border-dashed
                 border-zinc-700 bg-zinc-950/60 cursor-pointer
                 hover:border-emerald-500 transition overflow-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {!preview ? (
        <>
          <div className="text-emerald-400 text-3xl mb-2">📷</div>
          <p className="text-sm text-zinc-300">
            Drag & drop QR image here
          </p>
          <span className="text-xs text-zinc-500">
            or click to upload
          </span>
        </>
      ) : (
        <Image
          src={preview}
          alt="QR Preview"
          fill
          unoptimized   // IMPORTANT for local blob URLs
          className="object-contain bg-black"
        />
      )}
    </motion.label>
  );
}
