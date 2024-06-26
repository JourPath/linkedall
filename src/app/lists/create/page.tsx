import CreateListForm from "@/components/forms/create-list-form";

export default function CreateList() {
  return (
    <section className="bg-[--light-blue-1] h-screen">
      <h2 className="font-bold text-5xl text-left p-4">Create List</h2>
      <CreateListForm />
    </section>
  );
}
