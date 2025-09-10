import axios from "axios";

const uploadImages = async (images: File[]): Promise<string[]> => {
  const imageUrls: string[] = [];

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER;

  for (const image of images) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);
    data.append("folder", folder);

    try {
      const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data
      );
      imageUrls.push(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return imageUrls;
};

export default uploadImages;
