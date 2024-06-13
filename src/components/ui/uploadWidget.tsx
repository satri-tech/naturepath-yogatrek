// components/UploadWidget.tsx
import { useEffect } from 'react';

interface UploadWidgetProps {
  onUpload: (url: string) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ onUpload }) => {
  useEffect(() => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const cloudinaryWidget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          sources: ['local', 'url', 'camera', 'image_search'],
          multiple: true,
          folder: 'YOUR_FOLDER_NAME', // Optional: specify a folder to upload to
          maxFiles: 10, // Optional: specify a maximum number of files to upload
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
            onUpload(result.info.secure_url);
          }
        }
      );

      document.getElementById('upload_widget')?.addEventListener(
        'click',
        function () {
          cloudinaryWidget.open();
        },
        false
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onUpload]);

  return <button id="upload_widget">Upload Files</button>;
};

export default UploadWidget;
