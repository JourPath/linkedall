import Link from "next/link";

export default function Footer() {
  return (
    <section
      id="footer"
      className="bg-[--dark-blue-3] text-[--white] w-full px-4 py-8 flex flex-row h-20 items-center justify-around mt-auto"
    >
      <div className="flex flex-row items-center">
        <a
          href="https://linkedin.com/company/linkedall-online"
          target="_blank"
          className="inline-block mx-2"
        >
          <img src="/LinkedIn_icon.svg" alt="LinkedIn Logo" />
        </a>
        <a
          href="https://twitter.com/linkedallonline"
          target="_blank"
          className="inline-block mx-2"
        >
          <img src="/Twitter_icon.svg" alt="Twitter Logo" />
        </a>
        <Link href="/policy/privacy" className="mx-2 text-xs lg:text-base">
          Privacy Policy
        </Link>
        <Link href="/policy/terms" className="mx-2 text-xs lg:text-base">
          Terms & Conditions
        </Link>
      </div>
      <p className="text-xs">© 2023, Jourpath, All Rights Reserved.</p>
    </section>
  );
}
