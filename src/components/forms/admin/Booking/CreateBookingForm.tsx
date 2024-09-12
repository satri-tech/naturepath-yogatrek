"use client";
import { Form, FormField } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingFormSchema } from "@/utils/validation/BookingFormValidation";
import { useSession } from "next-auth/react";
import { inputType } from "@/utils/types/admin/inputType";
import { bookingFormInput } from "@/utils/types/admin/bookingFormInput";
import { selectOptionType } from "@/utils/types/admin/selectOptionType";
import { Package, Service } from "@prisma/client";
import { toastError, toastSuccess } from "@/lib/toast";
import TextInput from "../../FormElements/TextInput";
import DatePicker from "../../FormElements/DatePicker";
import TextAreaInput from "../../FormElements/TextAreainput";
import SelectInput from "../../FormElements/SelectInput";

const CreateBookingForm = () => {
  const session = useSession();
  const [packageOptions, setPackageOptions] = useState<selectOptionType[]>([]);

  const methods = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      packageId: "",
      fullname: "",
      email: "",
      contact: "",
      country: "",
      roomPreferences: "",
      noofPerson: "",
      message: "",
    },
  });

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = methods;

  const fetchPackageOptions = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/getPackage`,
        { next: { tags: [`PackagesCollection`], revalidate: 100 } }
      );
      const data = await response.json();
      const packages: Package[] = data.data;
      const packageOptions = packages.map((pckg) => {
        return {
          value: pckg.id,
          displayValue: pckg.title,
        };
      });
      setPackageOptions(packageOptions);
    } catch (error) {
      console.log(error);
    }
  };

  async function onSubmit(values: z.infer<typeof BookingFormSchema>) {
    try {
      if (session.data) {
        try {
          const formdata = {
            packageId: values.packageId,
            userId: session.data?.user.id,
            fullname: values.fullname,
            email: values.email,
            phone: values.contact,
            country: values.country,
            roomPreferences: values.roomPreferences,
            noofPerson: parseInt(values.noofPerson),
            message: values.message,
            bookingDate: values.bookingDate,
          };

          const jsonData = JSON.stringify(formdata);
          const response = await fetch("/api/booking/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${session.data?.user.accessToken}`,
            },
            body: jsonData,
          });
          const data = await response.json();
          console.log("data: ", data);

          if (data.success) {
            reset();
            toastSuccess("Package booked successfully!");
          } else {
            toastError(`Package book failed.`);
          }
        } catch (error) {
          toastError(`Package book failed. ${error}`);
        }
      } else {
        toastError(`Please login to book package!`);
      }
    } catch (err) {
      toastError(`Login failed. ${err}`);
      console.log(err);
    }
  }

  const inputs: inputType<bookingFormInput>[] = [
    {
      name: "fullname",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      error: errors.fullname?.message,
      element: "input",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "bookingDate",
      label: "Starting Date",
      type: "text",
      placeholder: "Choose Starting Date",
      error: errors.bookingDate?.message,
      element: "date-picker",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "noofPerson",
      label: "No. of Person",
      type: "number",
      min: 1,
      step: 1,
      pattern: "[0-9]*",
      placeholder: "Choose Number of Person",
      error: errors.noofPerson?.message,
      element: "input",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
      error: errors.email?.message,
      element: "input",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "Enter your country",
      error: errors.country?.message,
      element: "input",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "contact",
      label: "Contact Number",
      type: "text",
      placeholder: "Enter your contact no. with country code.",
      error: errors.contact?.message,
      element: "input",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "packageId",
      label: "Package",
      type: "text",
      placeholder: "Select a package",
      error: errors.packageId?.message,
      element: "select",
      options: packageOptions,
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "roomPreferences",
      label: "Room Preference",
      type: "text",
      placeholder: "Select your room preference",
      error: errors.roomPreferences?.message,
      element: "select",
      options: [
        { value: "SHARED", displayValue: "Shared" },
        { value: "PRIVATE", displayValue: "Private" },
      ],
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "message",
      label: "Message",
      type: "text",
      placeholder: "Enter your Message.",
      error: errors.message?.message,
      element: "textarea",
      className: "w-full",
    },
  ];

  useEffect(() => {
    fetchPackageOptions();
  }, []);

  return (
    <Form
      methods={methods}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      buttonClassName="w-fit"
      buttonLabel="Book Package"
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
          pattern,
          className,
          showField = true,
          multiple,
          options,
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
                  pattern={pattern}
                  wrapperClass={className}
                  field={field}
                />
              )}
            />
          ) : element == "date-picker" ? (
            <FormField
              key={i}
              control={control}
              name={name}
              render={({ field }) => (
                <DatePicker
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
                  min={min}
                  step={step}
                  pattern={pattern}
                  wrapperClass={className}
                  field={field}
                />
              )}
            />
          ) : (
            element == "select" && (
              <FormField
                key={i}
                control={control}
                name={name}
                render={({ field }) => (
                  <SelectInput
                    name={name}
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    error={error}
                    autoFocus={autoFocus}
                    register={register}
                    min={min}
                    step={step}
                    pattern={pattern}
                    wrapperClass={className}
                    field={field}
                    options={options as selectOptionType[]}
                    setValue={setValue}
                  />
                )}
              />
            )
          )
        ) : (
          <span className={className} key={i}></span>
        );
      })}
    </Form>
  );
};

export default CreateBookingForm;
