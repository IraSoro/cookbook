import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req) {
  try {
    const form = await req.formData();

    if (!form.has("image")) {
      return NextResponse.json(
        { status: "'image' field is null" },
        { status: 500 }
      );
    }

    const filename = form.get("filename");
    const file = form.get("image");

    if (!file) {
      return NextResponse.json(
        { status: "image data is null" },
        { status: 500 }
      );
    }

    const { error } = await supabase.storage
      .from("cookbook-image")
      .upload(`public/${filename}`, file);

    if (error) {
      return NextResponse.json(
        { status: `Error ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ status: `Error ${err}` }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const imageName = await req.json();

    if (!imageName || imageName.trim() === "") {
      return NextResponse.json({ status: "no image name" }, { status: 400 });
    }

    const { data, error } = await supabase.storage
      .from("cookbook-image")
      .remove([`public/${imageName}`]);

    if (error) {
      console.error("Error deleting image:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const form = await req.formData();

    if (!form.has("image") || !form.has("filename")) {
      return NextResponse.json(
        { status: "Missing 'image' or 'filename' field" },
        { status: 400 }
      );
    }

    const filename = form.get("filename");
    const file = form.get("image");

    const { error: deleteError } = await supabase.storage
      .from("cookbook-image")
      .remove([`public/${filename}`]);

    if (deleteError) {
      console.error("Error deleting old image:", deleteError);
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 }
      );
    }

    const { data, error: uploadError } = await supabase.storage
      .from("cookbook-image")
      .upload(`public/${filename}`, file);

    if (uploadError) {
      console.error("Error uploading new image:", uploadError);
      return NextResponse.json(
        { success: false, error: uploadError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
