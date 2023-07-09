import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '../../utils/types/supabase';

export const createClient = () => {
  return createServerComponentClient<Database>({ cookies });
};

// this also works
