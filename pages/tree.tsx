import Link from 'next/link';
import { useState, ReactNode } from 'react';

import LoadingDots from 'components/ui/LoadingDots';
import Button from 'components/ui/Button';
import { useUser } from 'utils/useUser';
import { postData } from 'utils/helpers';

import { supabase } from '@/utils/supabase-client';

import { User } from '@supabase/supabase-js';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

export default function Tree({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const { isLoading, subscription, userDetails } = useUser();
  const [title, setTitle] = useState<string |undefined>();
  const [url, setUrl] = useState<string |undefined>();


  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  // Create a link
  const addNewLink = async () => {
    try {
        if (title && url) {
            const { data, error } = await supabase.from("links").insert({
                title: title,
                url: url,
                user_id: userDetails?.id,
            })
            .select();
            if (error) throw error;
            console.log("data", data)
        }
    } catch (error) {
        console.log("error", error)
    }
  }


  return (
    <section className="bg-white mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
            Create a tree
          </h1>
          <p className="mt-5 text-xl text-black sm:text-center sm:text-2xl max-w-2xl m-auto">
            We partnered with Stripe for a simplified billing.
          </p>
          <input 
          type="text" 
          name='title'
          id='title'
          className='block w-full rounded-md text-black border-2 m-2 p-2'
          placeholder='my awesome link'
          onChange={(e) => setTitle(e.target.value)}
          />
          <input 
          type="text" 
          name='url'
          id='urls'
          className='block w-full rounded-md text-black border-2 m-2 p-2'
          placeholder='my awesome url'
          onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={addNewLink} type='button' className='text-black border-2 '>Create a link</button>
        </div>
      </div>
      <div className="p-4 text-black">
      </div>
    </section>
  );
}