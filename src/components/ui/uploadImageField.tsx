"use Client";
import Image from "next/image";
import { Input } from "./input";
import { X } from "lucide-react";

export default function UploadImageField({
  images,
  imageerror,
  handleChangeFunc,
}: {
  images: File | null;
  handleChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageerror: string;
}) {
  return (
    <>
      <div className="grid grid-cols-12 gap-2 my-2 border border-slate-200 bg-white  dark:bg-slate-950  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:text-text-dark/75 dark:focus-visible:ring-slate-300 rounded-md relative cursor-pointer">
        {images ? (
          <>
            <div className="relative col-span-12" key={images.name}>
              <Image
                src={URL.createObjectURL(images)}
                alt={images.name}
                className="object-fit h-44 w-full mx-auto object-cover object-center"
                height={500}
                width={500}
                quality={100}
              />
              {/*remove button*/}
              <span className=" absolute top-0 right-0 inline-block p-1.5 cursor-pointer z-20 bg-white text-yoga-red rounded">
                <X size={16} />
              </span>
            </div>
          </>
        ) : (
          <div className="relative col-span-12 grid h-40 w-auto justify-center cursor-pointer">
            <p className=" mx-auto place-self-center dark:text-text-dark/75">
              Upload the image
            </p>
          </div>
        )}

        <div className="flex flex-1 justify-between absolute left-0 right-0 bottom-0 top-0 z-10 cursor-pointer">
          <Input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleChangeFunc}
            className=" block w-full h-full opacity-0"
          />
        </div>
      </div>
      {imageerror && <p className="text-red-700">{imageerror}</p>}
    </>
  );
}
