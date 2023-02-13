import Dashboard from 'components/Dashboard';
import AlternativeLayout from "components/AlternativeLayout"
import { ReactElement } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';


export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

export default function DashboardPage() {
  return <Dashboard />;
}

DashboardPage.getLayout = function(page: ReactElement) {
    return <AlternativeLayout>{page}</AlternativeLayout>;
  };
