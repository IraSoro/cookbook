// import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        const { data, error } = await supabase.from("Recipes").select("*");

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data });
      }
      case "POST": {
        const newItem = req.body;
        if (Object.keys(newItem).length === 0) {
          throw `No body`;
        }

        delete newItem.id;
        const { data, error } = await supabase.from("Recipes").insert(newItem);
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(201).json({ data });
      }
      case "DELETE": {
        const idx = req.body;
        const { data, error } = await supabase
          .from("Recipes")
          .delete()
          .eq("id", idx);

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(202).json({ data });
      }
      case "PATCH": {
        if (Object.keys(req.body).length === 0) {
          throw `No body`;
        }
        const newItem = req.body.item;
        const { data, error } = await supabase
          .from("Recipes")
          .update(newItem)
          .eq("id", newItem.id);

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(203).json({ data });
      }
      default: {
        throw "unknown method";
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
