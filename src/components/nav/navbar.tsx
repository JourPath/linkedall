export default function NavBar() {
  return (
    <nav className="flex items-center justify-between h-28 px-2 bg-[--white]">
      <img className="w-1/2" src="./LinkedAll_1000x200px.svg" />
      <div className="bg-[--light-blue-1] rounded-full p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-[--blue-2]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </nav>
  );
}
