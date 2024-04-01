import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

import { Item } from "@/components/item";

const itemsPath = "./data/items.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case "GET": {
        const items = await fs.readFile(itemsPath, "utf8");
        res.status(201).json({ data: JSON.parse(items) });
        break;
      }
      case "POST": {
        const newItem = req.body;
        if (Object.keys(newItem).length === 0) {
          throw `No body`;
        }

        const items = JSON.parse(await fs.readFile(itemsPath, "utf8"));
        items.unshift(newItem);

        await fs.writeFile(itemsPath, JSON.stringify(items));
        res.status(202).json(newItem);
        break;
      }
      case "DELETE": {
        const idx = req.body;
        const items = JSON.parse(await fs.readFile(itemsPath, "utf8"));

        const deleteItemId = items.findIndex((item: Item) => {
          return item.id === idx;
        });

        if (deleteItemId < 0) {
          throw `Item with idx ${idx} not found.`;
        }

        const deleteItem = { ...items[deleteItemId] };
        items.splice(deleteItemId, 1);
        await fs.writeFile(itemsPath, JSON.stringify(items));

        res.status(203).json(deleteItem);
        break;
      }
      case "PATCH": {
        if (Object.keys(req.body).length === 0) {
          throw `No body`;
        }
        const idx = req.body.id;
        const newItem = req.body.item;
        const items = JSON.parse(await fs.readFile(itemsPath, "utf8"));

        if (idx < 0 && idx >= items.length) {
          throw `Item with idx ${idx} not found.`;
        }

        items[idx] = newItem;
        await fs.writeFile(itemsPath, JSON.stringify(items));

        res.status(205).json(newItem);
        break;
      }
      default: {
        throw "unknown method";
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
