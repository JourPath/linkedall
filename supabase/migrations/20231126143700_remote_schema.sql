
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "citext" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_hashids" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."can_list_add_user"("a_list_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$declare
  v_host_id uuid;
  v_user_plan text;
  v_user_tier int;
  v_list_people_num int;
begin
  -- select host id and save variable
  select host_id
  into v_host_id
  from lists
  where id = a_list_id;
  -- select plan of host id and save variable
  select plan 
  into v_user_plan
  from customers 
  where id = v_host_id;
  -- select config data for plan
  SELECT subscriptions->v_user_plan->>'max_people' INTO v_user_tier
  FROM config
  ORDER BY created_at DESC
  LIMIT 1;
  -- if null return true
  if v_user_tier is null
  then return true;
  end if;
  -- count number of people in list
  select count(*)
  into v_list_people_num
  from list_participants
  where list_id = a_list_id;
  -- check if less than plan allows
  return v_list_people_num < v_user_tier;
end;$$;

ALTER FUNCTION "public"."can_list_add_user"("a_list_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."can_user_host_list"("a_user_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$declare
  v_user_plan text;
  v_user_tier int;
  v_user_host_num int;
begin
  -- select plan for user_id
  -- save plan in variable
  select plan 
  into v_user_plan
  from customers 
  where id = a_user_id;
  -- select config data for plan
  -- store value for config in variable
  SELECT subscriptions->v_user_plan->>'max_host' INTO v_user_tier
  FROM config
  ORDER BY created_at DESC
  LIMIT 1;
  -- if null return true
  if v_user_tier is null
  then return true;
  end if;
  -- count how many lists currently joined
  -- save that in a variable
  select count(*)
  into v_user_host_num
  from lists
  where host_id = a_user_id;
  -- if that variable less than plan num return true
  return v_user_host_num < v_user_tier;
end;$$;

ALTER FUNCTION "public"."can_user_host_list"("a_user_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."can_user_join_list"("a_user_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$declare
  v_user_plan text;
  v_user_tier int;
  v_user_list_num int;
begin
  -- select plan for user_id
  -- save plan in variable
  select plan 
  into v_user_plan
  from customers 
  where id = a_user_id;
  -- select config data for plan
  -- store value for config in variable
  SELECT subscriptions->v_user_plan->>'max_join' INTO v_user_tier
  FROM config
  ORDER BY created_at DESC
  LIMIT 1;
  -- if null return true
  if v_user_tier is null
  then return true;
  end if;
  -- count how many lists currently joined
  -- save that in a variable
  select count(*)
  into v_user_list_num
  from list_participants
  where participant_id = a_user_id;
  -- if that variable less than plan num return true
  return v_user_list_num < v_user_tier;
end;$$;

ALTER FUNCTION "public"."can_user_join_list"("a_user_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_list_from_short_id"("shortid" "text") RETURNS TABLE("id" "uuid", "created_at" timestamp with time zone, "host_id" "uuid", "list_name" "text", "list_num" bigint, "short_id" "text")
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
  SELECT *
  FROM lists
  WHERE lists.short_id = shortid
$$;

ALTER FUNCTION "public"."get_list_from_short_id"("shortid" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_list_participants"("list_id_param" "uuid", "profile_id_param" "uuid") RETURNS TABLE("list_id" "uuid", "participant_id" "uuid", "full_name" "text", "avatar_url" "text", "linked_in" "text", "created_at" timestamp with time zone, "connection" boolean)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    lp.list_id, 
    lp.participant_id, 
    p.full_name,
    p.avatar_url,
    p.linked_in,
    lp.created_at,
    CASE 
      WHEN c.connection_id IS NOT NULL THEN TRUE 
      ELSE FALSE 
    END AS connection
  FROM list_participants AS lp
  LEFT JOIN connections AS c
  ON lp.participant_id = c.connection_id 
  AND lp.list_id = c.list_id
  AND c.profile_id = profile_id_param
  LEFT JOIN profiles AS p
  ON lp.participant_id = p.id
  WHERE lp.list_id = list_id_param;
END; 
$$;

ALTER FUNCTION "public"."get_list_participants"("list_id_param" "uuid", "profile_id_param" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_list_participants_with_connections"("list_id_param" "uuid", "profile_id_param" "uuid") RETURNS "record"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$SELECT 
    lp.*, 
    CASE 
      WHEN c.connection_id IS NOT NULL THEN TRUE 
      ELSE FALSE 
    END AS connection
  FROM list_participants AS lp
  LEFT JOIN connections AS c
  ON lp.participant_id = c.connection_id 
  AND lp.list_id = c.list_id
  AND c.profile_id = get_list_participants_with_connections.profile_id_param
  WHERE lp.list_id = get_list_participants_with_connections.list_id_param$$;

ALTER FUNCTION "public"."get_list_participants_with_connections"("list_id_param" "uuid", "profile_id_param" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_short_list_id"() RETURNS "record"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$ select
    id_encode(list_num, 'Welcome to LinkedAll.online', 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890' ) as short_id
  from
  public.lists;$$;

ALTER FUNCTION "public"."get_short_list_id"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  insert into public.customers (id)
  values(new.id);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."insert_host_into_list"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
  insert into list_participants(list_id, participant_id)
  values(new.id, auth.uid());
  return new;
end;$$;

ALTER FUNCTION "public"."insert_host_into_list"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."insert_short_id_into_list"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
  new.short_id = id_encode(new.list_num, 'Welcome to LinkedAll.online', 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
  return new;
end;$$;

ALTER FUNCTION "public"."insert_short_id_into_list"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_list_host"("list_id" "uuid", "host_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$select exists (
  select 1
  from lists li
  where li.id = is_list_host.list_id
  and li.host_id = is_list_host.host_id
);$$;

ALTER FUNCTION "public"."is_list_host"("list_id" "uuid", "host_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_list_participant"("list_id" "uuid", "participant_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$select exists (
  select 1
  from list_participants lp
  where lp.list_id = is_list_participant.list_id
  and lp.participant_id = is_list_participant.participant_id
);$$;

ALTER FUNCTION "public"."is_list_participant"("list_id" "uuid", "participant_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."config" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "subscriptions" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);

ALTER TABLE "public"."config" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."connections" (
    "profile_id" "uuid" NOT NULL,
    "connection_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "list_id" "uuid" NOT NULL
);

ALTER TABLE "public"."connections" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" "uuid" NOT NULL,
    "stripe_customer_id" "text",
    "interval" "text",
    "plan" "text" DEFAULT 'BASIC'::"text" NOT NULL
);

ALTER TABLE ONLY "public"."customers" FORCE ROW LEVEL SECURITY;

ALTER TABLE "public"."customers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."list_participants" (
    "list_id" "uuid" NOT NULL,
    "participant_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."list_participants" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."lists" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "host_id" "uuid" NOT NULL,
    "list_name" "text",
    "list_num" bigint NOT NULL,
    "short_id" "text" NOT NULL
);

ALTER TABLE "public"."lists" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."lists_list_num_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."lists_list_num_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."lists_list_num_seq" OWNED BY "public"."lists"."list_num";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "linked_in" "text",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."lists" ALTER COLUMN "list_num" SET DEFAULT "nextval"('"public"."lists_list_num_seq"'::"regclass");

ALTER TABLE ONLY "public"."config"
    ADD CONSTRAINT "config_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."connections"
    ADD CONSTRAINT "connections_pkey" PRIMARY KEY ("connection_id", "profile_id", "list_id");

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."list_participants"
    ADD CONSTRAINT "list_participants_pkey" PRIMARY KEY ("list_id", "participant_id");

ALTER TABLE ONLY "public"."lists"
    ADD CONSTRAINT "lists_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."lists"
    ADD CONSTRAINT "lists_short_id_key" UNIQUE ("short_id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

CREATE OR REPLACE TRIGGER "get_stripe_customer" AFTER INSERT ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "supabase_functions"."http_request"('https://www.linkedall.online/api/stripe/signup', 'POST', '{"Content-type":"application/json"}', '{"API_ROUTE_SECRET":"dbfb8018015522c6f716309dc620b4e011003b6a23d30608ddf3731a4bdf1883"}', '1000');

CREATE OR REPLACE TRIGGER "on_list_created" AFTER INSERT ON "public"."lists" FOR EACH ROW EXECUTE FUNCTION "public"."insert_host_into_list"();

CREATE OR REPLACE TRIGGER "on_list_created_insert_id" BEFORE INSERT ON "public"."lists" FOR EACH ROW EXECUTE FUNCTION "public"."insert_short_id_into_list"();

ALTER TABLE ONLY "public"."connections"
    ADD CONSTRAINT "connections_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."connections"
    ADD CONSTRAINT "connections_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "public"."lists"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."connections"
    ADD CONSTRAINT "connections_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."list_participants"
    ADD CONSTRAINT "list_participants_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "public"."lists"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."list_participants"
    ADD CONSTRAINT "list_participants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."lists"
    ADD CONSTRAINT "lists_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Allow Service Access All" ON "public"."customers" TO "service_role" USING (true) WITH CHECK (true);

CREATE POLICY "Can remove self from list_participants if not host" ON "public"."list_participants" FOR DELETE USING ((("participant_id" = "auth"."uid"()) AND (NOT "public"."is_list_host"("list_id", "auth"."uid"()))));

CREATE POLICY "Can view lists you are a partipant of" ON "public"."lists" FOR SELECT USING ("public"."is_list_participant"("id", "auth"."uid"()));

CREATE POLICY "Can view other list participants for lists they are in " ON "public"."list_participants" FOR SELECT USING ("public"."is_list_participant"("list_id", "auth"."uid"()));

CREATE POLICY "Only authenticated users can create a list" ON "public"."lists" FOR INSERT TO "authenticated" WITH CHECK ((true AND "public"."can_user_host_list"("auth"."uid"())));

CREATE POLICY "Only authenticated users can join a list" ON "public"."list_participants" FOR INSERT TO "authenticated" WITH CHECK ((true AND "public"."can_user_join_list"("auth"."uid"()) AND "public"."can_list_add_user"("list_id")));

CREATE POLICY "Only authenticated users can view other profiles" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Only host can delete a list" ON "public"."lists" FOR DELETE USING (("host_id" = "auth"."uid"()));

CREATE POLICY "User can add a connection but not themselves" ON "public"."connections" FOR INSERT WITH CHECK ((("profile_id" = "auth"."uid"()) AND ("profile_id" <> "connection_id")));

CREATE POLICY "User can remove a connection" ON "public"."connections" FOR DELETE USING (("profile_id" = "auth"."uid"()));

CREATE POLICY "User can view if they are a connection" ON "public"."connections" FOR SELECT USING (("connection_id" = "auth"."uid"()));

CREATE POLICY "User can view own customer data" ON "public"."customers" FOR SELECT USING (("id" = "auth"."uid"()));

CREATE POLICY "User can view their connections" ON "public"."connections" FOR SELECT USING (("profile_id" = "auth"."uid"()));

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."config" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."connections" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."list_participants" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."lists" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."can_list_add_user"("a_list_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."can_list_add_user"("a_list_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_list_add_user"("a_list_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."can_user_host_list"("a_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."can_user_host_list"("a_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_user_host_list"("a_user_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."can_user_join_list"("a_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."can_user_join_list"("a_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_user_join_list"("a_user_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_list_from_short_id"("shortid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_list_from_short_id"("shortid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_list_from_short_id"("shortid" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_list_participants"("list_id_param" "uuid", "profile_id_param" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_list_participants"("list_id_param" "uuid", "profile_id_param" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_list_participants"("list_id_param" "uuid", "profile_id_param" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_list_participants_with_connections"("list_id_param" "uuid", "profile_id_param" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_list_participants_with_connections"("list_id_param" "uuid", "profile_id_param" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_list_participants_with_connections"("list_id_param" "uuid", "profile_id_param" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_short_list_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_short_list_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_short_list_id"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."insert_host_into_list"() TO "anon";
GRANT ALL ON FUNCTION "public"."insert_host_into_list"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_host_into_list"() TO "service_role";

GRANT ALL ON FUNCTION "public"."insert_short_id_into_list"() TO "anon";
GRANT ALL ON FUNCTION "public"."insert_short_id_into_list"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_short_id_into_list"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_list_host"("list_id" "uuid", "host_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_list_host"("list_id" "uuid", "host_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_list_host"("list_id" "uuid", "host_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."is_list_participant"("list_id" "uuid", "participant_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_list_participant"("list_id" "uuid", "participant_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_list_participant"("list_id" "uuid", "participant_id" "uuid") TO "service_role";

GRANT ALL ON TABLE "public"."config" TO "anon";
GRANT ALL ON TABLE "public"."config" TO "authenticated";
GRANT ALL ON TABLE "public"."config" TO "service_role";

GRANT ALL ON TABLE "public"."connections" TO "anon";
GRANT ALL ON TABLE "public"."connections" TO "authenticated";
GRANT ALL ON TABLE "public"."connections" TO "service_role";

GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";

GRANT ALL ON TABLE "public"."list_participants" TO "anon";
GRANT ALL ON TABLE "public"."list_participants" TO "authenticated";
GRANT ALL ON TABLE "public"."list_participants" TO "service_role";

GRANT ALL ON TABLE "public"."lists" TO "anon";
GRANT ALL ON TABLE "public"."lists" TO "authenticated";
GRANT ALL ON TABLE "public"."lists" TO "service_role";

GRANT ALL ON SEQUENCE "public"."lists_list_num_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."lists_list_num_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."lists_list_num_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
