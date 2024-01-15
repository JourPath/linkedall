"use client";

import { buttonVariants } from "@/components/ui/button";
import { useUserProfile } from "@/utils/context/profile-context";
import { Profile } from "@/utils/types/collections.types";
import { User } from "@supabase/supabase-js";
import Linkify from "linkify-react";
import Link from "next/link";
import ProfileButton from "../_buttons/profile-button";
import ProfileDisplay from "../_displays/profile-display";
export function ProfileViewer({
  profile,
  user,
}: {
  profile: Profile | null;
  user: User;
}) {
  const { userProfile } = useUserProfile();
  let profileToDisplay = userProfile ? userProfile : profile!;

  return (
    <div className="flex flex-col items-center justify-start bg-sidebar rounded-md mx-4 py-4 h-screen mb-4">
      {user?.id === profileToDisplay?.id ? (
        <ProfileDisplay profile={profileToDisplay} editable={false} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <ProfileButton profile={profile!} />
          {profileToDisplay?.avatar_url ? (
            <img
              src={profileToDisplay?.avatar_url}
              className="rounded-full w-36 h-36"
              alt="profile image"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-36 h-36"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <h3 className="font-bold text-xl mb-4">
            {profileToDisplay?.full_name}
          </h3>
          <div className="flex flex-col items-center justify-center w-full">
            <Link
              href={`https://www.linkedin.com/in/${profileToDisplay?.linked_in}`}
              target="blank"
              aria-disabled={profileToDisplay?.linked_in ? false : true}
              // className="h-12 justify-center flex items-center"
              className={buttonVariants({ variant: "default" })}
            >
              Connect
            </Link>
            <Linkify
              as="p"
              options={{
                className:
                  "inline-block w-10/12 h-13 bg-background m-4 rounded-md p-2",
              }}
            >
              {profileToDisplay?.bio}
            </Linkify>
          </div>
        </div>
      )}
    </div>
  );
}
