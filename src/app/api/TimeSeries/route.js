// pages/api/countries.js

import { NextResponse } from "next/server";
import fs from "fs";

export async function GET(req) {
  try {
    // Read the JSON file
    const data = fs.readFileSync("daily_IBM.json", "utf-8");

    // Parse the JSON data
    const countries = JSON.parse(data);

    // Send the data as a response
    return NextResponse.json(countries);
  } catch (error) {
    // Handle any errors
    return new NextResponse("Internal error", { status: 500 });
  }
}
