import { InputHTMLAttributes, ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";

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
  buttonLabel?: string;
  onSubmit?: any;
  handleSubmit?: any;
  register?: UseFormRegister<T>;
  className?: string;
  formTitle?: string;
  methods: UseFormReturn<T>;
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
}

export interface TextInputProps<T extends FieldValues> extends InputProps<T> {
  field: ControllerRenderProps<T>;
}

export interface ImageInputProps<T extends FieldValues> extends InputProps<T> {
  field: ControllerRenderProps<T>;
  handleImageFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  images: File | null;
  imageerror: string;
}

export interface RichTextEditorInputProps<T extends FieldValues>
  extends InputProps<T> {
  field: ControllerRenderProps<T>;
  setValue: UseFormSetValue<T>;
}

export interface ImageInputProps<T extends FieldValues> extends InputProps<T> {
  field: ControllerRenderProps<T>;
  iconSizeClass: string;
  containerSizeClass: string;
}
