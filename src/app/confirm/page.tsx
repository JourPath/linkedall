import NavBar from '@/components/nav/nav-bar';

export default function Confirm() {
  return (
    <section className="bg-[--light-blue-1] h-screen">
      <NavBar />
      <h2 className="font-bold text-5xl text-left p-4">Confirm your email</h2>
      <p className="text-xl text-left p-4">
        Please check your inbox for an email to confirm your email address
      </p>
    </section>
  );
}
