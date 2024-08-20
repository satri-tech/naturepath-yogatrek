"use client";
import {
  Form,
  FormField,
} from "@/components/ui/form";
import React from "react";
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

const AllBookingform = () => {
  const session = useSession();

  const methods = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = methods;

  async function onSubmit(values: z.infer<typeof BookingFormSchema>) {
    try {
      if (session.data) {
        const formdata = {
          packageId: values.package,
          userId: session.data?.user.id,
          fullname: values.FullName,
          email: values.Email,
          phone: values.contact,
          country: values.country,
          roomPreferences: values.roomPeferance,
          noofPerson: parseInt(values.NoofPerson),
          message: values.Message,
          bookingDate: values.StartingDate,
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
      } else {
        const formdata = {
          packageId: values.package,
          fullname: values.FullName,
          email: values.Email,
          phone: values.contact,
          country: values.country,
          roomPreferences: values.roomPeferance,
          noofPerson: parseInt(values.NoofPerson),
          message: values.Message,
          bookingDate: values.StartingDate,
        };
        const jsonData = JSON.stringify(formdata);
        const response = await fetch("/api/booking/create", {
          method: "POST",
          body: jsonData,
        });
        const data = await response.json();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const inputs: inputType<bookingFormInput>[] = [
    {
      name: "FullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      error: errors.FullName?.message,
      element: "input",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "StartingDate",
      label: "Starting Date",
      type: "text",
      placeholder: "Choose Starting Date",
      error: errors.StartingDate?.message,
      element: "date-picker",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "NoofPerson",
      label: "No. of Person",
      type: "number",
      min: 1,
      step: 1,
      pattern: "[0-9]*",
      placeholder: "Choose Number of Person",
      error: errors.NoofPerson?.message,
      element: "input",
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "Email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
      error: errors.Email?.message,
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
      name: "package",
      label: "Package",
      type: "text",
      placeholder: "Select a package",
      error: errors.package?.message,
      element: "select",
      options: [
        { value: "Package 1", displayValue: "Package 1" },
        { value: "Package 2", displayValue: "Package 2" },
        { value: "Package 3", displayValue: "Package 3" },
      ],
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "roomPeferance",
      label: "Room Preference",
      type: "text",
      placeholder: "Select your room preference",
      error: errors.roomPeferance?.message,
      element: "select",
      options: [
        { value: "SHARED", displayValue: "Shared" },
        { value: "PRIVATE", displayValue: "Private" },
      ],
      className: "w-full md:w-[calc(50%_-_8px)]",
    },
    {
      name: "Message",
      label: "Message",
      type: "text",
      placeholder: "Enter your Message.",
      error: errors.Message?.message,
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

export default AllBookingform;
