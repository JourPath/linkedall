import LoginForm from '@/components/forms/login-form';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};
export default async function Login({
  params,
}: {
  params: { listid: string };
}) {
  return (
    <>
      <div className="bg-[--light-blue-1] h-screen flex justify-around">
        <div className="md:w-1/2 lg:w-1/3 ">
          <LoginForm listId={params.listid} />
        </div>
      </div>
    </>
  );
}
