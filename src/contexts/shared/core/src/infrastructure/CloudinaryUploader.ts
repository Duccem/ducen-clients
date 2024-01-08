import { v2 } from 'cloudinary/lib/cloudinary';
import { unlinkSync } from 'fs';
import { Uploader, UploaderResponse } from '../domain/Uploader';

export class CloudinaryUploader implements Uploader {
  constructor({ cloudName, apiKey, apiSecret }: { cloudName: string; apiKey: string; apiSecret: string }) {
    v2.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }
  async upload(file: string): Promise<UploaderResponse> {
    const { public_id, url } = await v2.uploader.upload(file);
    unlinkSync(file);
    return { remote_id: public_id, url };
  }
}
