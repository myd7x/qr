"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { extractQrFromImage } from "@/lib/qr/extractQrFromImage";

type Props = {
  onQrExtracted: (url: string) => void;
};

export default function QRUploadBox({ onQrExtracted }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ---------------------------------
     Cleanup object URL (IMPORTANT)
  ---------------------------------- */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = async (file: File): Promise<void> => {
    if (!file.type.startsWith("image/")) return;

    setError(null);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const qrData = await extractQrFromImage(file);

    if (!qrData) {
      setError("No QR code detected in the image.");
      return;
    }

    onQrExtracted(qrData);
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
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
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
          unoptimized
          className="object-contain bg-black"
        />
      )}

      {error && (
        <span className="absolute bottom-2 text-xs text-red-400">
          {error}
        </span>
      )}
    </motion.label>
  );
}
