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
    externalResolver: true,
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
            console.log("No file uploaded");
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

            console.log("Image uploaded successfully");
            return res
              .status(200)
              .json({ message: "Image uploaded successfully" });
          } catch (error) {
            console.log("Error reading file:", error.message);
            return res.status(500).json({ error: "Internal server error" });
          }
        });
        break;
      }
      case "DELETE": {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields) => {
          if (err) {
            console.log("Error parsing the filename:", err);
            return res
              .status(500)
              .json({ error: "Error parsing the filename" });
          }
          const imageName = fields;

          if (!imageName || imageName.toString().trim() === "") {
            console.log("No file name");
            return res.status(400).json({ error: "No file name" });
          }

          const { error } = await supabase.storage
            .from("cookbook-image")
            .remove([`public/${imageName}`]);

          if (error) {
            console.log("Error deleting from Supabase:", error.message);
            return res.status(500).json({ error: `Error: ${error.message}` });
          }

          console.log("Image deleted successfully");
          return res
            .status(200)
            .json({ message: "Image deleted successfully" });
        });
        break;
      }
      case "PATCH": {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.log("Error parsing the files:", err);
            return res.status(500).json({ error: "Error parsing the files" });
          }

          const lastFilename = fields.lastFilename;
          const newFilename = fields.newFilename;
          const file = files.image[0];

          if (!file) {
            console.log("No file uploaded");
            return res.status(400).json({ error: "No file uploaded" });
          }
          const filePath = file.filepath;

          try {
            const { error: deleteError } = await supabase.storage
              .from("cookbook-image")
              .remove([`public/${lastFilename}`]);

            if (deleteError) {
              console.log(
                "Error deleting from Supabase (PATCH):",
                deleteError.message
              );
              return res
                .status(500)
                .json({ error: `Error: ${deleteError.message}` });
            }

            const fileData = await fs.readFile(filePath);
            const uploadPath = `public/${newFilename}`;

            const { error: uploadError } = await supabase.storage
              .from("cookbook-image")
              .upload(uploadPath, fileData, {
                contentType: file.mimetype,
                upsert: true,
              });

            if (uploadError) {
              console.log(
                "Error uploading to Supabase (PATCH):",
                uploadError.message
              );
              return res
                .status(500)
                .json({ error: `Error: ${uploadError.message}` });
            }

            console.log("Image edited successfully");
            return res
              .status(200)
              .json({ message: "Image edited successfully" });
          } catch (error) {
            console.log("Error reading file:", error.message);
            return res.status(500).json({ error: "Internal server error" });
          }
        });
        break;
      }
      default: {
        throw "Method not allowed";
      }
    }
  } catch (err) {
    console.log("err = ", err);
    res.status(400).json({ error: err });
  }
}
