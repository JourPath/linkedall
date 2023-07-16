import LoginForm from '@/components/forms/login-form';

export default async function Login() {
  return (
    <>
      <div className="bg-[--light-blue-1] h-screen">
        <LoginForm />
      </div>
    </>
  );
}
