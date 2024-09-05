"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloudinary } from "@/services/actions/uploadtoCloudinary";
import { AddTeamFormSchema } from "@/utils/validation/admin/TeamFormValidation";
import { addTeamFormInput } from "@/utils/types/admin/addTeamFormInput";
import { inputType } from "@/utils/types/admin/inputType";
import TextAreaInput from "../../FormElements/TextAreainput";
import TextInput from "../../FormElements/TextInput";
import ImageInputSingle from "../../FormElements/ImageInputSingle";
import { revalidateTag } from "next/cache";
import { useSession } from "next-auth/react";
import { urlToFile } from "@/lib/urlToFile";
import { TeamInterface } from "@/utils/types/admin/teamInterface";
import { Team } from "@prisma/client";

interface UpdateFormTypes {
  id: string;
  name?: string;
  bio?: string;
  position?: string;
  image?: string;
}

const UpdateTeamForm = ({ teamMember }: { teamMember: Team }) => {
  const [images, setImages] = useState<File | null>(null);
  const [imageerror, setImageError] = useState<string>("");

  const methods = useForm<z.infer<typeof AddTeamFormSchema>>({
    resolver: zodResolver(AddTeamFormSchema),
    defaultValues: {
      name: teamMember.name,
      position: teamMember.position,
      profile_pic: images as File | undefined,
      bio: teamMember.bio,
    },
  });

  const session = useSession();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = methods;

  const getImage = async () => {
    const image = await urlToFile(
      teamMember.image as string,
      "service-thumbnail.jpg",
      "image/jpeg"
    );
    setImages(image);
    setValue("profile_pic", image);
  };

  useEffect(() => {
    if (teamMember.image) getImage();
  }, []);

  // imagess
  const handleImageFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      setImageError("");
      const _files = Array.from(e.target.files);
      console.log("files from images", _files[0]);
      setImages(_files[0]);
    }
  };

  const updateImages = (img: File | null) => {
    setImages(img);
  };

  const updateImgError = (imgError: string) => {
    setImageError(imgError);
  };

  async function update(formdatas: UpdateFormTypes) {
    try {
      const jsonData = JSON.stringify(formdatas);
      const response = await fetch("/api/team/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${session.data?.user.accessToken}`,
        },

        body: jsonData,
      });
      const data = await response.json();
      reset();

      if (data && data.success) {
        reset();
        setImages(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit(values: z.infer<typeof AddTeamFormSchema>) {
    if (images) {
      const res = await UploadCloudinary(images);
      if (res.url) {
        try {
          const formdata = {
            id: teamMember.id,
            name: values.name,
            position: values.position,
            image: res.url,
            bio: values.bio,
          };
          await update(formdata);
        } catch (err) {
          console.log(err);
        }
      }
      if (res.error) {
        setImageError(res.error);
      }
    } else {
      setImageError("Upload the Image");
    }
  }

  const inputs: inputType<addTeamFormInput>[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Team member name here...",
      error: errors.name?.message,
      element: "input",
      className: "w-full xl:w-[calc(50%_-_8px)]",
    },
    {
      name: "position",
      label: "Position",
      type: "text",
      placeholder: "Enter member position",
      error: errors.position?.message,
      element: "input",
      className: "w-full xl:w-[calc(50%_-_8px)]",
    },
    {
      name: "profile_pic",
      label: "Profile picture",
      type: "file",
      placeholder: "Select profile pic",
      error: errors.profile_pic?.message,
      element: "image",
      className: "w-full",
    },
    {
      name: "bio",
      label: "Biography",
      type: "text",
      placeholder: "Enter biography...",
      error: errors.bio?.message,
      element: "textarea",
      className: "w-full",
    },
  ];

  return (
    <Form
      methods={methods}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      {inputs.map((input, i) => {
        const {
          name,
          type,
          placeholder,
          error,
          autoFocus,
          label,
          element,
          min,
          step,
          className,
          showField = true,
          multiple,
        } = input;
        return showField ? (
          element == "input" ? (
            <FormField
              key={i}
              control={control}
              name={name}
              render={({ field }) => (
                <TextInput
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  error={error}
                  autoFocus={autoFocus}
                  register={register}
                  min={min}
                  step={step}
                  wrapperClass={className}
                  field={field}
                />
              )}
            />
          ) : element == "textarea" ? (
            <FormField
              key={i}
              control={control}
              name={name}
              render={({ field }) => (
                <TextAreaInput
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  error={error}
                  autoFocus={autoFocus}
                  register={register}
                  wrapperClass={className}
                  field={field}
                />
              )}
            />
          ) : (
            <FormField
              control={control}
              key={i}
              name={name}
              defaultValue=""
              render={({ field }) => (
                <ImageInputSingle
                  key={i}
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  error={error}
                  autoFocus={autoFocus}
                  register={register}
                  wrapperClass={className}
                  field={field}
                  handleImageFileSelected={handleImageFileSelected}
                  imageerror={imageerror}
                  images={images}
                  updateImages={updateImages}
                  updateImgError={updateImgError}
                />
              )}
            />
          )
        ) : (
          <span className={className} key={i}></span>
        );
      })}
    </Form>
  );
};

export default UpdateTeamForm;
