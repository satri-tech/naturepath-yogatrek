

interface UploadResult {
    url?: string;
    error?: string;
  }
  
  export const UploadCloudinary = async (file: File): Promise<UploadResult> => {
    try {
    
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const imgUrl = data.secure_url;
      return { url: imgUrl };
    } catch (error:any) {
      return { error: error?.message as string|| "An error occurred during the upload" };
    }
  };
  