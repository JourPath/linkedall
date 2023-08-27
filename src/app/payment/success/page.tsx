import ProfileForward from '@/components/buttons/profile-forward';

export default function Success() {
  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      <div className="rounded shadow px-6 py-8">
        <h2>Success</h2>
        <p>Thank you for subscribing!</p>
        <ProfileForward />
      </div>
    </div>
  );
}
