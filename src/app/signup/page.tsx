import NavBar from '@/components/nav/navBar';
import SignUpForm from '../../components/forms/sign-up-form';

export default async function SignUp() {
  return (
    <>
      <NavBar />
      <div className="bg-[--light-blue-1] h-screen">
        <SignUpForm />
      </div>
    </>
  );
}
