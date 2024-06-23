// import { NextResponse, NextRequest } from "next/server";

import { createClient } from "@supabase/supabase-js";

import formidable from "formidable";
import { promises as fs } from "fs";

// TODO: replace this to separate file (for example lib/supabaseClient.js)
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST": {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.log("Error parsing the files:", err);
            return res.status(500).json({ error: "Error parsing the files" });
          }

          const filename = fields.filename;
          const file = files.image[0];

          if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
          }
          const filePath = file.filepath;
          try {
            const fileData = await fs.readFile(filePath);
            const uploadPath = `public/${filename}`;

            const { error } = await supabase.storage
              .from("cookbook-image")
              .upload(uploadPath, fileData, {
                contentType: file.mimetype,
              });

            if (error) {
              console.log("Error uploading to Supabase:", error.message);
              return res.status(500).json({ error: `Error: ${error.message}` });
            }

            return res
              .status(200)
              .json({ message: "Image uploaded successfully" });
          } catch (error) {
            console.log("Error reading file:", error.message);
            return res.status(500).json({ error: "Internal server error" });
          }
        });
      }
      case "DELETE": {
        const imageName = await req.body;

        if (!imageName || imageName.trim() === "") {
          return res.status(400).json({ error: "No file name" });
        }

        const { data, error } = await supabase.storage
          .from("cookbook-image")
          .remove([`public/${imageName}`]);

        if (error) {
          console.log("Error uploading to Supabase:", error.message);
          return res.status(500).json({ error: `Error: ${error.message}` });
        }

        return res.status(200).json({ message: "Image deleted successfully" });
      }
      case "PATCH": {
      }
      default: {
        res.status(500).json({ error: "Method not allowed" });
      }
    }
  } catch (err) {
    console.log("err = ", err);
    res.status(400).json({ error: err });
  }
}

// export async function DELETE(req) {
//   try {
//     const imageName = await req.json();

//     if (!imageName || imageName.trim() === "") {
//       return NextResponse.json({ status: "no image name" }, { status: 400 });
//     }

//     const { data, error } = await supabase.storage
//       .from("cookbook-image")
//       .remove([`public/${imageName}`]);

//     if (error) {
//       console.error("Error deleting image:", error);
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (err) {
//     console.error("Error processing request:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(req) {
//   try {
//     const form = await req.formData();

//     if (!form.has("image") || !form.has("filename")) {
//       return NextResponse.json(
//         { status: "Missing 'image' or 'filename' field" },
//         { status: 400 }
//       );
//     }

//     const filename = form.get("filename");
//     const file = form.get("image");

//     const { error: deleteError } = await supabase.storage
//       .from("cookbook-image")
//       .remove([`public/${filename}`]);

//     if (deleteError) {
//       console.error("Error deleting old image:", deleteError);
//       return NextResponse.json(
//         { success: false, error: deleteError.message },
//         { status: 500 }
//       );
//     }

//     const { data, error: uploadError } = await supabase.storage
//       .from("cookbook-image")
//       .upload(`public/${filename}`, file);

//     if (uploadError) {
//       console.error("Error uploading new image:", uploadError);
//       return NextResponse.json(
//         { success: false, error: uploadError.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (err) {
//     console.error("Error processing request:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
