"use client";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { SelectInputProps } from "@/utils/types/admin/inputType";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectInput = <T extends {}>({
  register,
  name,
  error,
  label,
  wrapperClass,
  placeholder,
  type,
  min,
  step,
  showField,
  value,
  defaultValue,
  inputClassName,
  field,
  options,
  ...rest
}: SelectInputProps<T>) => {
  return (
    <FormItem className={`${wrapperClass}`}>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option, i) => {
            const { value, displayValue } = option;
            return (
              <SelectItem key={i} value={value}>
                {displayValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default SelectInput;
