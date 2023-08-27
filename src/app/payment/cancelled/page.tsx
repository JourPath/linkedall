import Forward from '@/components/buttons/forward';

export default function Cancelled() {
  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      <div className="rounded shadow px-6 py-8">
        <h2>Payment Cancelled</h2>
        <p>You have not been charged</p>
        <Forward time={3000} path={'pricing'} />
      </div>
    </div>
  );
}
