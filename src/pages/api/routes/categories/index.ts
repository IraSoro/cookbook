import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

const itemsPath = "./data/categories.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        const items = await fs.readFile(itemsPath, "utf8");
        res.status(201).json({ data: JSON.parse(items) });
        break;
      }
      case "PATCH": {
        if (Object.keys(req.body).length === 0) {
          throw `No body`;
        }
        const newItem = req.body.newCategory;
        const oldName = req.body.oldName;
        const items = JSON.parse(await fs.readFile(itemsPath, "utf8"));

        const newItems = items.map((item: string) => {
          if (item === oldName) {
            return newItem;
          }
          return item;
        });
        await fs.writeFile(itemsPath, JSON.stringify(newItems));

        res.status(205).json(newItem);
        break;
      }
      default: {
        res.status(405).json({ error: "Method not allowed" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
