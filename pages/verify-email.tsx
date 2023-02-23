import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import VerifyEmail from '@/components/VerifyEmail';

export default function VerifyEmailPage() {
  return <VerifyEmail />;
}
