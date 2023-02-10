import Link from 'next/link';
import s from './Footer.module.css';

import LogoWhite from 'components/icons/LogoWhite';
import GitHub from 'components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4 bg-zinc-900">
        <div>
        <Link href="/">
            <a className="flex flex-initial items-center font-bold md:mr-24">
              <span className="mr-2">
                <LogoWhite />
              </span>
            </a>
          </Link>
        </div>
        <div className="flex">
          <div>
            <Link href="https://app.termly.io/document/privacy-policy/9a4544f1-da37-4483-b15d-a9082ff46c79">
              <a className='mr-5'>Privacy Policy</a>
            </Link>
            <Link href="https://app.termly.io/document/terms-of-use-for-saas/dea9b01b-5bf0-48fd-bcc2-5c4f33f33c4b">
              <a>Terms and conditions</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
