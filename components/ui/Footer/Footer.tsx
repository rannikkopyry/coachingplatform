import Link from 'next/link';
import s from './Footer.module.css';

import Logo from 'components/icons/Logo';
import GitHub from 'components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4 bg-zinc-900">
        <div>
        <Link href="/">
            <a className="flex flex-initial items-center font-bold md:mr-24">
              <span className="mr-2">
                <Logo />
              </span>
            </a>
          </Link>
        </div>
        <div className="flex">
          <div>
            <Link href="/privacy-policy" className='mr-5'>
              <a>Privacy Policy</a>
            </Link>
            <Link href="/terms-and-conditions">
              <a>Terms and conditions</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
