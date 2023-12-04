import { signOut } from "../_actions";

export default async function SignOutButton() {
  return (
    <form action={signOut}>
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Log out
      </button>
    </form>
  );
}
