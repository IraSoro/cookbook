import type { NextApiRequest, NextApiResponse } from "next";

import { promises as fs } from "fs";
const itemsPath = "./data/items.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const newItem = req.body;
      if (Object.keys(newItem).length === 0) {
        throw `No body`;
      }

      const items = JSON.parse(await fs.readFile(itemsPath, "utf8"));
      items.unshift(newItem);

      await fs.writeFile(itemsPath, JSON.stringify(items));
      res.status(202).json(newItem);
    } else {
      const items = await fs.readFile(itemsPath, "utf8");
      res.status(201).json({ data: JSON.parse(items) });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
