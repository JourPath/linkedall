import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '../../utils/types/database.types';

export const createClient = () =>
  createServerComponentClient<Database>({ cookies });
