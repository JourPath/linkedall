import LoginForm from '@/components/forms/login-form';

export default async function Login() {
  return (
    <>
      <div className="bg-[--light-blue-1] h-screen flex justify-around">
        <div className="md:w-1/2 lg:w-1/3 ">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
