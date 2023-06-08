import { Database } from './database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type List_Id = Database['public']['Tables']['lists']['Row']['id'];
