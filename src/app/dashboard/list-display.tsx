import { createClient } from '@/lib/supabase/supabase-server';

const getLists = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('list_participants')
    .select('list_id, lists(list_name)')
    .eq('participant_id', user?.user?.id);
  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

const ListDisplay = async () => {
  const lists = await getLists();
  return (
    <section>
      {lists?.map((list) => {
        return <p key={list.list_id}>List:{list.lists.list_name}</p>;
      })}
    </section>
  );
};

export default ListDisplay;
