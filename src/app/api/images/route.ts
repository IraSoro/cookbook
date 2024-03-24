import fs from "fs/promises";
import { NextRequest } from "next/server";

const path = "public/data/";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  if (!form.has("image")) {
    return Response.json(
      { status: "'image' field is null" },
      {
        status: 500,
      },
    );
  }

  const filename = form.get("filename") as string;
  const file = form.get("image") as File;

  if (!file) {
    return Response.json(
      { status: "image data is null" },
      {
        status: 500,
      },
    );
  }

  await fs.writeFile(
    `${path}${filename}`,
    new Uint8Array(await file.arrayBuffer()),
  );

  return Response.json(
    { status: "Success" },
    {
      status: 200,
    },
  );
}

export async function DELETE(req: NextRequest) {
  const imageName = await req.json();
  if (imageName === "") {
    return Response.json(
      { status: "no image name" },
      {
        status: 500,
      },
    );
  }

  const filePath = path + imageName;
  await fs.unlink(filePath).catch((err) => {
    return Response.json(
      { error: err },
      {
        status: 500,
      },
    );
  });

  return Response.json(
    { status: "Success" },
    {
      status: 200,
    },
  );
}
