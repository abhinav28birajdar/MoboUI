import { supabase } from './client';

/**
 * Upload image to Supabase storage
 * @param file - The file to upload
 * @param bucket - Storage bucket name (default: 'uploads')
 * @param folder - Folder path within bucket
 * @returns Public URL of the uploaded file
 */
export async function uploadImage(
  file: File,
  bucket = 'uploads',
  folder = 'components'
) {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${timestamp}-${random}.${ext}`;

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      url: urlData.publicUrl,
      error: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('Image upload error:', message);
    return {
      path: null,
      url: null,
      error: message,
    };
  }
}

/**
 * Delete image from Supabase storage
 * @param path - File path in storage
 * @param bucket - Storage bucket name
 */
export async function deleteImage(path: string, bucket = 'uploads') {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }

    return { success: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Delete failed';
    console.error('Image delete error:', message);
    return { success: false, error: message };
  }
}

/**
 * Upload code file to storage
 * @param code - Code content
 * @param fileName - Name of the file
 * @param bucket - Storage bucket name
 */
export async function uploadCode(
  code: string,
  fileName: string,
  bucket = 'code'
) {
  try {
    const timestamp = Date.now();
    const filePath = `${timestamp}-${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, new Blob([code], { type: 'text/plain' }), {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      url: urlData.publicUrl,
      error: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('Code upload error:', message);
    return {
      path: null,
      url: null,
      error: message,
    };
  }
}
