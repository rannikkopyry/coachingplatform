import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import LoadingDots from 'components/ui/LoadingDots';
import Logo from 'components/icons/Logo';
import { getURL } from '@/utils/helpers';
import { Auth, EmailAuth, ThemeSupa } from '@supabase/auth-ui-react';
import { supabase } from '@/utils/supabase-client';

const SignIn = () => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [ready, setReady] = useState<boolean | undefined>(false);

  async function signInWithEmail() {
    try {
      if (email && password) {
        const resp = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });
        if (resp.error) throw resp.error;
        const userId = resp.data.user?.id;
        console.log(userId);
        setReady(true);
        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <div className="flex justify-center pb-12 ">
            <Logo width="64px" height="64px" />
          </div>
          <div className="flex flex-col space-y-4">
            <label className="text-black" htmlFor="email">
              Email:
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="block w-ful rounded-lg border-4 text-black p-3"
              placeholder="you@exampe.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-black" htmlFor="email">
              Password:
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="block w-full rounded-lg border-4 text-black p-3"
              placeholder="ExamplePassword"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="text-black border-4 p-3"
              onClick={signInWithEmail}
            >
              Sign in
            </button>
            <div className="text-black">
              <a href="/signup">
                Dont have an account yet?{' '}
                <span className="underline">Sign up</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
};

export default SignIn;
