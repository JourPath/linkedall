import SignUpForm from '../forms/sign-up-form';

export default function GetStarted() {
  return (
    <section id="get-started" className="my-8 px-4">
      <h2 className="font-bold text-5xl text-left">Create a list now</h2>
      <p className="my-5 text-left">
        Sign up with LinkedIn to get started right away
      </p>
      <SignUpForm />
    </section>
  );
}
