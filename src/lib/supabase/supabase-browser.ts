import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../utils/types/database.types';

export const createClient = () => {
  return createClientComponentClient<Database>();
};
