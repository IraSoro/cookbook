import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST": {
        const { email, password } = req.body;

        const { user, session, error } = await supabase.auth.signInWithPassword(
          {
            email,
            password,
          }
        );

        if (error) {
          return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ user, session });
      }
      default: {
        throw "unknown method";
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
