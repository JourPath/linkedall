import Forward from "@/components/buttons/forward";

export default function Success() {
  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      <div className="rounded shadow px-6 py-8">
        <h2>Success</h2>
        <p>Thank you for subscribing!</p>
        <Forward time={3000} path={"profile"} />
      </div>
    </div>
  );
}
