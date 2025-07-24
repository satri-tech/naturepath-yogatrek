"use client";
import { Form, FormField } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingFormSchema } from "@/utils/validation/BookingFormValidation";
import { useSession } from "next-auth/react";
import DatePicker from "../FormElements/DatePicker";
import { inputType } from "@/utils/types/admin/inputType";
import { bookingFormInput } from "@/utils/types/admin/bookingFormInput";
import TextInput from "../FormElements/TextInput";
import TextAreaInput from "../FormElements/TextAreainput";
import SelectInput from "../FormElements/SelectInput";
import { selectOptionType } from "@/utils/types/admin/selectOptionType";
import { Package } from "@prisma/client";
import { toastError, toastSuccess } from "@/lib/toast";

const AllBookingform = () => {
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

  // Organized inputs by sections
  const personalInfoInputs: inputType<bookingFormInput>[] = [
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
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
      error: errors.email?.message,
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
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "Enter your country",
      error: errors.country?.message,
      element: "input",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
  ];

  const bookingDetailsInputs: inputType<bookingFormInput>[] = [
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
  ];

  const additionalInfoInputs: inputType<bookingFormInput>[] = [
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

  const renderFormFields = (inputs: inputType<bookingFormInput>[]) => {
    return inputs.map((input, i) => {
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
        <div key={i} className={className}>
          {element == "input" ? (
            <FormField
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
                  wrapperClass="w-full"
                  field={field}
                />
              )}
            />
          ) : element == "date-picker" ? (
            <FormField
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
                  wrapperClass="w-full"
                  field={field}
                />
              )}
            />
          ) : element == "textarea" ? (
            <FormField
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
                  wrapperClass="w-full"
                  field={field}
                />
              )}
            />
          ) : (
            element == "select" && (
              <FormField
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
                    wrapperClass="w-full"
                    field={field}
                    options={options as selectOptionType[]}
                    setValue={setValue}
                  />
                )}
              />
            )
          )}
        </div>
      ) : (
        <span className={className} key={i}></span>
      );
    });
  };

  useEffect(() => {
    fetchPackageOptions();
  }, []);

  return (
    <div className=" w-full px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
        <div className="p-6">
          <Form
            methods={methods}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            buttonClassName="w-full bg-primary/95 hover:bg-primary text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
            buttonLabel="Book Package"
          >
            <div className="flex flex-col  w-full">


              {/* Personal Information Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                </div>
                <div className="flex flex-wrap gap-4 pl-11">
                  {renderFormFields(personalInfoInputs)}
                </div>
              </div>
              {/* Booking Details Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Trip Details</h3>
                </div>
                <div className="flex flex-wrap gap-4 pl-11">
                  {renderFormFields(bookingDetailsInputs)}
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
                </div>
                <div className="flex flex-wrap gap-4 pl-11">
                  {renderFormFields(additionalInfoInputs)}
                </div>
              </div>

            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AllBookingform;