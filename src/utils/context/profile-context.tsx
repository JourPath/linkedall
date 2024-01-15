"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { Profile } from "../types/collections.types";

type ProfileContextType = {
  userProfile: Profile | null;
  updateUserProfile: (profile: Profile) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  const updateUserProfile = (profile: Profile) => {
    setUserProfile(profile);
  };

  return (
    <ProfileContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useUserProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  } else {
    return context;
  }
};
