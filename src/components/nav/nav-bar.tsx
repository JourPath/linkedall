'use client';

import { Disclosure } from '@headlessui/react';

import { usePathname } from 'next/navigation';
import NavButton from '../buttons/nav-button';
import { useAuth } from '@/utils/providers/supabase-auth-provider';
import ProfileButton from '../buttons/profile-button';
import Link from 'next/link';
import Image from 'next/image';

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const { user, signOut, isLoading } = useAuth();
  const pathname = usePathname();
  let navigation = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
  ];

  if (user) {
    navigation = [
      { name: 'Home', href: '/' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Profile', href: '/profile' },
      { name: 'Upgrade', href: '/pricing' },
    ];
  }

  // if (isLoading) {
  //   return <p>Loading Nav...</p>;
  // }

  return (
    <Disclosure as="nav" className="bg-[--light-blue-1]">
      {({ open }) => (
        <>
          <div className="w-screen mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-start">
              <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                {/* Logo */}
                <div className="flex flex-shrink-1 items-center">
                  <Link href="/">
                    <Image
                      className="block w-auto"
                      height={48}
                      src="/LinkedAll_1000x200.svg"
                      alt="LinkedAll Logo"
                    />
                  </Link>
                </div>
                {/* Normal screen menu items */}
                <div className="hidden sm:ml-6 sm:flex items-center">
                  <div className="flex space-x-4 items-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === pathname
                            ? 'bg-[--blue-1] text-white'
                            : 'text-[--dark-blue-3] hover:bg-[--dark-blue-3] hover:text-[--white]',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={
                          item.href === pathname ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                    {user ? (
                      <a
                        onClick={signOut}
                        className="text-[--dark-blue-3] hover:bg-[--dark-blue-3] hover:text-[--white] rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                      >
                        Sign Out
                      </a>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              {/* Button on Right */}
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {user ? (
                  <ProfileButton open={open} avatarUrl={user.avatar_url} />
                ) : (
                  <NavButton open={open} />
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {user ? <p className="text-center">{user.full_name}</p> : ''}
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === pathname
                      ? 'bg-[--blue-1] text-[--white]'
                      : 'text-[--dark-blue-3] hover:bg-[--dark-blue-3] hover:text-[--white]',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.href === pathname ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {user ? (
                <Disclosure.Button
                  onClick={signOut}
                  className="text-[--dark-blue-3] hover:bg-[--dark-blue-3] hover:text-[--white] rounded-md px-3 py-2 text-base font-medium"
                >
                  Sign Out
                </Disclosure.Button>
              ) : (
                ''
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
