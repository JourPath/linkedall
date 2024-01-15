"use client";
import { createClientBrowser } from "@/lib/supabase/supabase-browser";
import { useRef, useState } from "react";

export default function AvatarButton({
  url,
  onUpload,
  edit,
}: {
  url: string;
  onUpload: Function;
  edit: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const supabase = createClientBrowser();
  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      console.log(filePath, file);
      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);
      console.log(publicUrl);
      onUpload(publicUrl);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleClick} className="w-20 h-20" disabled={!edit}>
        <input
          className="hidden"
          type="file"
          id="single"
          ref={inputRef}
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
        {url ? (
          <img
            src={url}
            alt="Avatar"
            className="avatar image rounded-full w-20 h-20 object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-20 h-20"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
