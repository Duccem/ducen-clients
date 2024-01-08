export abstract class Uploader {
  public abstract upload(file: string): Promise<UploaderResponse>;
}

export type UploaderResponse = {
  remote_id: string;
  url: string;
};
