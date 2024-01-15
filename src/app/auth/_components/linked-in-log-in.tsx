"use client";
import { logInWithLinkedIn } from "../_actions";

export default function LinkedInLogInButton() {
  return (
    <form>
      <button
        formAction={logInWithLinkedIn}
        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        <img
          src="/In-Blue-48.png"
          className="w-7 inline pr-2"
          alt="LinkedIn Logo"
        />
        <p>LinkedIn</p>
      </button>
    </form>
  );
}
