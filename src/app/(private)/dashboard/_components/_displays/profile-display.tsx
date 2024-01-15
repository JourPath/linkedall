"use client";

import AvatarButton from "@/components/buttons/avatar-button";
import { Profile } from "@/utils/types/collections.types";
import { useState } from "react";
import ProfileForm from "../_forms/profile-form";

export default function ProfileDisplay({
  profile,
  editable,
}: {
  profile: Profile;
  editable: boolean;
}) {
  const [avatar, setAvatar] = useState(profile.avatar_url || "");
  const [edit, setEdit] = useState(editable);

  return (
    <div className="w-10/12">
      {edit ? "" : <button onClick={() => setEdit(!edit)}>Edit</button>}
      <AvatarButton
        url={avatar}
        onUpload={(url: string) => {
          setAvatar(url);
        }}
        edit={edit}
      />
      <ProfileForm
        profile={profile}
        avatar={avatar}
        edit={edit}
        setEdit={setEdit}
      />
    </div>
  );
}
