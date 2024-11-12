"use client";
import { CldUploadWidget } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function ImageInput() {
  return (
    <CldUploadWidget
    uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}>
    {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}

    </CldUploadWidget>
  );
}