import { InputHTMLAttributes, ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";
import { selectOptionType } from "./selectOptionType";

export interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > {
  name: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  autoFocus?: boolean;
  element?: string;
  min?: number;
  step?: number;
  className?: string;
  showField?: boolean;
  multiple?: boolean;
  wrapperClass?: string;
  inputClassName?: string;
  register: UseFormRegister<T>;
}

export interface IFormProps<T extends FieldValues> {
  defaultValues?: any;
  children?: ReactNode;
  buttonLabel?: string | ReactNode;
  onSubmit?: any;
  handleSubmit?: any;
  register?: UseFormRegister<T>;
  className?: string;
  formTitle?: string;
  methods: UseFormReturn<T>;
  buttonClassName?: string;
  encType?:string;
}

export interface inputType<T extends FieldValues>
  extends InputHTMLAttributes<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > {
  name: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  autoFocus?: boolean;
  element: string;
  min?: number;
  step?: number;
  className?: string;
  showField?: boolean;
  multiple?: boolean;
  wrapperClass?: string;
  options?: selectOptionType[];
}

export interface TextInputProps<T extends FieldValues> extends InputProps<T> {
  field: ControllerRenderProps<T>;
}

export interface ImageInputProps<T extends FieldValues> extends InputProps<T> {
  field: ControllerRenderProps<T>;
  handleImageFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  images: File | null;
  imageerror: string;
  updateImages: (img: File | null) => void;
  updateImgError: (imgError: string) => void;
}

export interface ImageInputMultipleProps<T extends FieldValues>
  extends InputProps<T> {
  field: ControllerRenderProps<T>;
  images: File[] | null;
  imageerror: string;
  updateImages: (img: File[] | null) => void;
  updateImgError: (imgError: string) => void;
}

export interface RichTextEditorInputProps<T extends FieldValues>
  extends InputProps<T> {
  field: ControllerRenderProps<T>;
  setValue: UseFormSetValue<T>;
}

export interface ImageInputProps<T extends FieldValues> extends InputProps<T> {}

export interface SelectInputProps<T extends FieldValues> extends InputProps<T> {
  field: ControllerRenderProps<T>;
  setValue: UseFormSetValue<T>;
  options: selectOptionType[];
}
