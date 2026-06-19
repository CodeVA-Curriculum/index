// TODO: return PDF file from this endpoint
import { redirect,json } from '@sveltejs/kit'
import * as schema from '$lib/server/db/schema'
import { db } from '$lib/server/db/index'
import { eq } from 'drizzle-orm'
import type { RequestHandler } from './$types';
import { promises as fs } from 'fs';
import path from 'path';

export const GET: RequestHandler = async ( { request, locals } ) => {
  // TODO: check permissions on locals.user
  const id = "16R6WSD0FJly_2HSAeIyMu7Oocb_A7n80UGUVLzwdCwo"
  const filePath = "./documents/" + id + ".pdf"
  console.log("Got call for PDF", id)
  try {
    const data = await fs.readFile(filePath);
    // Determine the Content-Type from the file extension
    const contentType = 'application/pdf';

    return new Response({
      status: 200,
      headers: {
        'Content-Type': contentType,
      },
      body: data,
    });
  } catch (error) {
    // Handle errors, like file not found
    return new Response({
      status: 404,
      body: 'File not found',
    });
  }
};
