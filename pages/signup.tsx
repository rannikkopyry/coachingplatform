import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import LoadingDots from 'components/ui/LoadingDots';
import Logo from 'components/icons/Logo';
import { getURL } from '@/utils/helpers';
import { Auth, EmailAuth, ThemeSupa } from '@supabase/auth-ui-react';
import { supabase } from '@/utils/supabase-client';

const SignUp = () => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [email, setEmail] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [ready, setReady] = useState<boolean | undefined>(false);

  const userId = user?.id;

  /* useEffect(() => {
    if (user) {
      router.replace('/account');
    }
  }, [user]); */

  async function signUpWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) throw error;
      console.log(data);
      // @ts-ignore
      const userId = data.data.user?.id;
      console.log(userId);
      if (userId) {
        await createUser(userId);
      }
      setReady(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function signUpWithEmail() {
    try {
      if (email && password) {
        const resp = await supabase.auth.signUp({
          email: email,
          password: password
        });
        if (resp.error) throw resp.error;
        const userId = resp.data.user?.id;
        if (userId) {
          await createUser(userId);
        }
        setReady(true);
        console.log(userId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Create user in the manually created users table
  async function createUser(userId: string) {
    try {
      const { error } = await supabase
        .from('users')
        .insert({ id: userId, username: username });
    } catch (error) {
      console.log(error);
    }
  }

  if (!user)
    return (
      <div className="flex justify-center height-screen mb-20 mt-20">
        <div className="flex flex-col justify-between max-w-lg p-8 m-auto w-120 sm: max-w-80 border-2 border-black rounded-xl shadow-xl">
          <div className="flex justify-center pb-2">
            <Logo width="64px" height="64px" />
          </div>
          <div className="flex justify-center">
            <h2 className="text-black text-3xl font-extrabold p-4">Sign up</h2>
          </div>
          <div className="flex flex-col space-y-4">
            <label className="text-black" htmlFor="email">
              Username:
            </label>
            <input
              name="username"
              type="username"
              id="username"
              className="block w-ful rounded-lg border-4 text-black p-3"
              placeholder="John Doe"
              onChange={(e) => setUsername(e.target.value)}
            />
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
            {ready === true && (
              <>
                <div className="text-black mt-5">
                  Check your email to verify your account.
                </div>
              </>
            )}
            <button
              className="text-black border-4 p-3"
              onClick={signUpWithEmail}
            >
              Sign up
            </button>
            <div className="text-black">
              <a href="/signin">
                Already have an account?{' '}
                <span className="underline">Sign in</span>
              </a>
            </div>
            <button
              className="text-black border-4 p-3 flex align-middle text-center"
              onClick={signUpWithGoogle}
            >
              <img className="h-7 mr-4 align-middle" src="/google.png" alt="" />
              Sign up using Google
            </button>
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

export default SignUp;
