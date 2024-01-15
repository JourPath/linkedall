"use client";
import { useUserProfile } from "@/utils/context/profile-context";
import { Profile } from "@/utils/types/collections.types";

export default function ProfileButton({ profile }: { profile: Profile }) {
  const { updateUserProfile } = useUserProfile();

  function handleProfile() {
    updateUserProfile(profile);
  }

  return (
    <form action={handleProfile}>
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        My Profile
      </button>
    </form>
  );
}
