import { supabase } from '../app/utils/supabase-client';

export default function Home({ profiles }) {
  console.log({ profiles });
  console.log(supabase.auth.getUser());
  return (
    <main>
      <div>Sign In</div>
    </main>
  );
}

// async function signInWithLinkedIn() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'linkedin',
//   });
// }

async function signout() {
  const { error } = await supabase.auth.signOut();
}

export const getStaticProps = async () => {
  const { data: profiles } = await supabase.from('profiles').select();

  return {
    props: {
      profiles,
    },
  };
};
