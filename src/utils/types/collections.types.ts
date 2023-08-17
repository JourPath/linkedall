import { Database } from './database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type List_Id = Database['public']['Tables']['lists']['Row']['id'];

export type get_list_participants =
  Database['public']['Functions']['get_list_participants'];

export type get_list_from_short_id =
  Database['public']['Functions']['get_list_from_short_id'];

export type List = Database['public']['Tables']['lists']['Row'];

export type customer = Database['public']['Tables']['customers']['Row']