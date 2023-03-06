import React from 'react';
import { hasCookie, setCookie } from 'cookies-next';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie('localConsent'));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie('localConsent', 'true', {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className="fixed inset-0">
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-8 bg-gray-100">
        <span className="text-black text-base mr-16">
          This website uses cookies to improve user experience. By using our
          website you consent to all cookies in accordance with our{' '}
          <a
            className="underline"
            href="https://app.termly.io/document/cookie-policy/84d04e7a-450c-40e4-820b-b4c0c1812f20"
          >
            Cookie policy
          </a>
          .
        </span>
        <button
          className="mt-3 flex w-full min-h-[50px] items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
          onClick={() => acceptCookie()}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
