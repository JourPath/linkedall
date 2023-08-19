'use client';
import { useAuth } from '@/utils/providers/supabase-auth-provider';
import { useSupabase } from '@/utils/providers/supabase-provider';
import { useEffect, useState } from 'react';
import AvatarButton from '../buttons/avatar-button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfileSection() {
  const { user, isLoading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [avatar, setAvatar] = useState('');

  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      if (user.linked_in) {
        setLinkedIn(user?.linked_in);
      }
      if (user.avatar_url) {
        setAvatar(user?.avatar_url);
      }
    }
  }, [user]);

  const handleClick = async (url: string) => {
    if (fullName && linkedIn) {
      await supabase
        .from('profiles')
        .update({ full_name: fullName, linked_in: linkedIn, avatar_url: url })
        .eq('id', user?.id);
      setAvatar(avatar);
      router.push('/dashboard');
    }
  };

  if (isLoading) {
    return <p>Loading Profile...</p>;
  }

  return (
    <section className="flex flex-col justify-around content-center items-center mt-4">
      {!user?.avatar_url ? (
        <p className="text-[--dark-blue-1] font-bold m-2 p-2 w-full  text-center ">
          Let people see who you are 😊
        </p>
      ) : (
        ''
      )}
      <div className="w-11/12 mb-4 pb-2 ">
        <div className="text-center flex flex-col items-center">
          <label htmlFor="linked_in" className="text-xs mx-4 font-bold">
            Profile Picture
          </label>
          <AvatarButton
            url={avatar}
            onUpload={(url: string) => setAvatar(url)}
          />
        </div>
      </div>
      {!fullName ? (
        <p className="text-[--dark-blue-1] font-bold m-2 p-2 w-full  text-center ">
          Don't forget your name 📛
        </p>
      ) : (
        ''
      )}
      <div className="bg-[--light-blue-2] rounded-full w-11/12 mb-4 pb-2 ">
        <div className="">
          <label htmlFor="linked_in" className="text-xs mx-8 font-bold">
            Name
          </label>
          <input
            className="mx-8 w-10/12 bg-[--light-blue-2] font-bold"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            type="text"
          />
        </div>
      </div>
      {!linkedIn ? (
        <div className="flex flex-row ">
          <Image
            src="/downward-arrow-right.svg"
            height={50}
            width={50}
            alt="downward arrow"
          />
          <p className="text-[--dark-blue-1] font-bold m-2 p-2 w-full  text-center ">
            Help people find you on LinkedIn
          </p>
        </div>
      ) : (
        ''
      )}
      <div className="bg-[--light-blue-2] rounded-full w-11/12 mb-4 pb-2 ">
        <div className="">
          <label htmlFor="linked_in" className="text-xs mx-8 font-bold">
            LinkedIn URL: https://www.linkedin.com/in/
          </label>
          <input
            id="linked_in"
            className="mx-8 w-10/12 bg-[--light-blue-2] font-bold"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            required
            type="text"
          />
        </div>
      </div>
      {/* <input>{userLocal[0]?.linked_in}</input> */}
      {!fullName || !linkedIn ? <p>Enter Name and LinkedIn to Save</p> : ''}
      <button
        className="bg-[--blue-2] rounded-full text-[--white] h-12 w-1/4"
        onClick={() => handleClick(avatar)}
      >
        Save Changes
      </button>
    </section>
  );
}
