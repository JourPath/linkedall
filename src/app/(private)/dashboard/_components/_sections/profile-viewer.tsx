import { Profile } from "@/utils/types/collections.types";

export function ProfileViewer({ profile }: { profile: Profile | null }) {
  return (
    <div className="flex flex-col items-center justify-start bg-sidebar rounded-md mx-4 py-4 h-screen">
      <div className="flex flex-col items-center justify-center">
        {profile?.avatar_url ? (
          <img
            src={profile?.avatar_url}
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
        <h3 className="font-bold text-xl mb-4">{profile?.full_name}</h3>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <a
          target="_blank"
          className="text-sm"
          href={`https://www.linkedin.com/in/${profile?.linked_in}`}
        >
          Connect
        </a>
        <p className="inline-block h-1/3 bg-background">{profile?.bio}</p>
      </div>
    </div>
  );
}
