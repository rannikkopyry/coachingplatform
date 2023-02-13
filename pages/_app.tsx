import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';

import * as gtag from '../utils/gtag';

import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import type { Database } from 'types_db';
import type { NextPage } from 'next'


export default function MyApp({ Component, pageProps }: AppProps): any {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const renderWithLayout =
    Component.getLayout ||
    function (page: JSX.Element) {
    return (
        <div className="bg-white">
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyUserContextProvider>
      </SessionContextProvider>
    </div>
      );
    };
    return renderWithLayout(<SessionContextProvider supabaseClient={supabaseClient}>
      <MyUserContextProvider>
          <Component {...pageProps} />
      </MyUserContextProvider>
    </SessionContextProvider>);
}
