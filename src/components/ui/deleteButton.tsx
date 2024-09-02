"use client";
import { Trash2 } from "lucide-react";

export default function DeleteButton({
  clickFunc,
  className,
}: {
  clickFunc?: () => void;
  className?: string;
}) {
  return (
    <span
      className={` p-2 block bg-yoga-red/10 border-yoga-red/10 text-yoga-red rounded hover:bg-yoga-red/20 border hover:border-yoga-red/50 transition-all duration-300 ${className}`}
      onClick={clickFunc}
    >
      <Trash2 size={16} />
    </span>
  );
}
