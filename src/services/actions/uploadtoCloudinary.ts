interface UploadResult {
  url?: string;
  error?:string;
}

export const UploadCloudinary = async (file: File): Promise<UploadResult> => {
  try {

    const timestamp = Math.round(new Date().getTime() / 1000);
   
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    console.log("response",response)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data",data)
    const imgUrl = data.secure_url;
    console.log("imgUrl",imgUrl)
    return { url: imgUrl };
  } catch (error:any) {
    return {error: error?.mesage }
    throw error;
  }
};
