"use client";
import { useState } from "react";

export default function ClipboardCopy({ copyText }: { copyText: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  }
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      onClick={handleCopyClick}
      className="h-12  w-1/2 flex flex-row items-center text-center text-bold text-[--blue-2] border-2 border-[--blue-2] rounded-lg"
    >
      {isCopied ? (
        <p className="text-center w-full">Copied!</p>
      ) : (
        <>
          <p className="w-1/2">List Code:</p>
          <input
            type="text"
            value={copyText}
            readOnly
            className="bg-transparent w-1/2 text-center min-w-[30%] cursor-pointer"
          />
        </>
      )}
    </button>
  );
}
