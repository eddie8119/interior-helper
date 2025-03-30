import React from 'react'
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary'
export default function ImageUploadButton() {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      signatureEndpoint="/api/sign-image"
      uploadPreset="nm-demo"
      className={`border-secondary text-secondary hover:bg-secondary/10 flex items-center gap-2 rounded-lg border-2 px-4 py-2`}
    >
      Upload new image
    </CldUploadButton>
  )
}
