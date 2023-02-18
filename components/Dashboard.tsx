import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase-client';
import { useUser } from 'utils/useUser';

export default function Dashboard() {
  const [userId, setUserId] = useState<string | undefined>();
  const [trees, setTrees] = useState<string | any>();
  const user = useUser();

  useEffect(() => {
    setUserId(user?.user?.id);
  }, [user]);

  useEffect(() => {
    const getTrees = async () => {
      try {
        const { data, error } = await supabase
          .from('trees')
          .select('name')
          .eq('user_id', userId);
        if (error) throw error;
        if (data) {
          setTrees(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getTrees();
    }
  }, [userId]);

  return (
    <>
      <div className="h-screen bg-white w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_2fr] min-h-[500px] items-center  px-4 m-auto py-[60px] z-10">
          <section className="">
            <div className="bg-grey">
              <h2 className="text-black text-3xl md:text-5xl font-bold font-grotesk_bold text-center md:text-left">
                My pages
              </h2>
            </div>
          </section>
          <section className="basis-1/2"></section>
        </div>
      </div>
    </>
  );
}
