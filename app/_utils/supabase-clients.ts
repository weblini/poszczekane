import 'server-only'

import { createClient } from "@supabase/supabase-js";

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!

export const supabaseAdmin = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL || '',
	process.env.SUPABASE_SERVICE_ROLE_KEY || '',
	{
		auth: {
			persistSession: false
		}
	}
);

// Note: supabaseAnon is the default client for loading data anonymously for better caching

export const supabaseAnon = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL || '',
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
	{
		auth: {
			persistSession: false
		}
	}
)