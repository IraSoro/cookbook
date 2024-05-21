import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

import { RecipeType } from "@/state/recipe-types";

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

        const deleteItemId = items.findIndex((item: RecipeType) => {
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
        const newItem = req.body.item;
        const items = JSON.parse(await fs.readFile(itemsPath, "utf8"));

        const newItems = items.map((item: RecipeType) => {
          if (item.id === newItem.id) {
            return newItem;
          }
          return item;
        });
        await fs.writeFile(itemsPath, JSON.stringify(newItems));

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
