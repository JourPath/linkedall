"use client";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import { usePathname } from "next/navigation";

export default function ListShareButtons({ listName }: { listName: string }) {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;

  return (
    <div className="flex flex-row items-center justify-evenly gap-2 my-2">
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton
        url={url}
        title={`Connect with everyone from ${listName} on #LinkedAll`}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <EmailShareButton
        url={url}
        subject={`Connect with everyone from ${listName} on LinkedAll`}
        body={`I thought you might like to connect with everyone from ${listName} on LinkedAll. Here's the link:`}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
}
