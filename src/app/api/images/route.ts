import fs from "fs/promises";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  if (!form.has("image")) {
    return Response.json({ status: "'image' field is null"}, {
      status: 500,
    });
  }

  const filename = form.get("filename") as string;
  const file = form.get("image") as File;

  console.log(filename);

  if (!file) {
    return Response.json({ status: "image data is null"}, {
      status: 500
    });
  }

  await fs.writeFile("some_file.jpg", new Uint8Array(await file.arrayBuffer()));

  return Response.json({ status: "Success" }, {
    status: 200,
  });
}
