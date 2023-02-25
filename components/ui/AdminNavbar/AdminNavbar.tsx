import Link from 'next/link';
import s from './AdminNavbar.module.css';

import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import Image from 'next/image';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ReactElement, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase-client';
import Logo from '@/components/icons/Logo';
import SimpleLayout from '@/components/SimpleLayout';

const AdminNavbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | any>();
  const [username, setUsername] = useState<string | any>();
  const [userId, setUserId] = useState<string | any>();

  /* const { user } = useUser();

  console.log(user); */

  const { creatorSlug } = router.query;
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, profile_picture_url, username')
          .eq('username', creatorSlug);
        if (error) throw error;
        const profilePictureUrl = data![0]['profile_picture_url'];
        const userId = data![0]['id'];
        const userName = data![0]['username'];
        setUserId(userId);
        setProfilePictureUrl(profilePictureUrl);
        setUsername(userName);
      } catch (error) {
        console.log(error);
      }
    };

    if (creatorSlug) {
      getUser();
    }
  }, [creatorSlug]);

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-7 z-40">
        <div className="flex justitfy-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="/dashboard">
                <a className={s.link}>My page</a>
              </Link>
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
