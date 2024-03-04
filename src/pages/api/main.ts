import type { NextApiRequest, NextApiResponse } from 'next'

import { promises as fs } from "fs";
const itemsPath = "./data/items.json";
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    const items = await fs.readFile(itemsPath, "utf8");
    res.status(201).json({ data: JSON.parse(items) });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
