import Link from 'next/link';
import s from './Navbar.module.css';
import Logo2 from 'components/icons/Logo2';
import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center ">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo2 />
              </a>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="#pricing">
                <a className={s.link}>Pricing</a>
              </Link>
              <Link href="/contact">
                <a className={s.link}>Contact</a>
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex flex-1 justify-end space-x-8">
            <button className="invisible lg:visible md:visible max-h-[50px] mt-6 bg-black text-white text-base font-medium py-3 px-6 rounded-full cursor-pointer">
              <a href="/contact">Leave us a message</a>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
