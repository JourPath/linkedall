import LoginForm from '@/components/forms/login-form';
import NavBar from '@/components/nav/navBar';
import Footer from '@/components/sections/footer';

export default async function Login() {
  return (
    <>
      <NavBar />
      <div className="bg-[--light-blue-1] h-screen">
        <LoginForm />
      </div>
    </>
  );
}
