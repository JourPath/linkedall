import { NewListForm } from "../_components/_forms/new-list-form";

export default function NewList() {
  return (
    <section className="bg-background h-screen">
      <h2 className="font-bold text-5xl text-left p-4">Create List</h2>
      <NewListForm />
    </section>
  );
}
