import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    if (!form.has("image")) {
      return NextResponse.json(
        { status: "'image' field is null" },
        { status: 500 }
      );
    }

    const filename = form.get("filename") as string;
    const file = form.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { status: "image data is null" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase.storage
      .from("cookbook-image")
      .upload(`public/${filename}`, file);

    if (error) {
      return NextResponse.json(
        { status: `Error ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { status: "Success" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ status: `Error ${err}` }, { status: 500 });
  }
}

// export async function DELETE(req: NextRequest) {
//   const imageName = await req.json();
//   if (imageName === "") {
//     return Response.json(
//       { status: "no image name" },
//       {
//         status: 500,
//       }
//     );
//   }

//   const filePath = path + imageName;
//   await fs.unlink(filePath).catch((err) => {
//     return Response.json(
//       { error: err },
//       {
//         status: 500,
//       }
//     );
//   });

//   return Response.json(
//     { status: "Success" },
//     {
//       status: 200,
//     }
//   );
// }

// export async function PATCH(req: NextRequest) {
//   const form = await req.formData();

//   if (!form.has("image")) {
//     return Response.json(
//       { status: "'image' field is null" },
//       {
//         status: 500,
//       }
//     );
//   }

//   const filename = form.get("filename") as string;
//   const file = form.get("image") as File;

//   if (!file) {
//     return Response.json(
//       { status: "image data is null" },
//       {
//         status: 500,
//       }
//     );
//   }

//   const filePath = path + filename;
//   await fs.unlink(filePath).catch((err) => {
//     return Response.json(
//       { error: err },
//       {
//         status: 500,
//       }
//     );
//   });

//   await fs.writeFile(
//     `${path}${filename}`,
//     new Uint8Array(await file.arrayBuffer())
//   );

//   return Response.json(
//     { status: "Success" },
//     {
//       status: 200,
//     }
//   );
// }
