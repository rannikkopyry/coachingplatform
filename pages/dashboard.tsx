import Dashboard from 'components/Dashboard';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import AlternativeLayout from "components/AlternativeLayout"
import { ReactElement } from 'react';


export default function DashboardPage() {
  return <Dashboard />;
}

DashboardPage.getLayout = function(page: ReactElement) {
    return <AlternativeLayout>{page}</AlternativeLayout>;
  };
