import Link from 'next/link';
import s from './AdminNavbar.module.css';

import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import Image from 'next/image';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase-client';
import Logo from '@/components/icons/Logo';

const AdminNavbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  /*   const { user } = useUser();
   */

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-7">
        <div className="flex justitfy-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="/dashboard">
                <a className={s.link}>Dashboard</a>
              </Link>
              <Link href="/account">
                <a className={s.link}>Account</a>
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex flex-1 justify-end space-x-8">
            <button className="invisible lg:visible md:visible max-h-[50px] mt-6 bg-black text-white text-base font-medium py-3 px-6 rounded-full cursor-pointer">
              Upgrade
            </button>
            <button className="invisible lg:visible md:visible max-h-[50px] mt-6 bg-black text-white text-base font-medium py-3 px-6 rounded-full cursor-pointer">
              Publish
            </button>
            {/* {profilePictureUrl && <Image
          src={profilePictureUrl}
          alt="Profile picture"
          height="100px"
          width="100px"
          className="rounded-full"
          />} */}
            {/* {user ? (
              <span
                className={s.link}
                onClick={async () => {
                  await supabaseClient.auth.signOut();
                  router.push('/signin');
                }}
              >
                Sign out
              </span>
            ) : (
              <Link href="/signin">
                <a className={s.link}>Sign in</a>
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;