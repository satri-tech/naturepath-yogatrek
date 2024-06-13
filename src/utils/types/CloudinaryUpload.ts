export interface CloudinaryUploadInfo {
  asset_id: string;
  public_id: string;
  version: 1718159733;
  version_id: string;
  signature: string;
  width: 2000;
  height: 2000;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: 1386256;
  type: string;
  etag: string;
  placeholder: false;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
}

export interface CloudinaryUpload {
    event:string
    info:CloudinaryUploadInfo
}


