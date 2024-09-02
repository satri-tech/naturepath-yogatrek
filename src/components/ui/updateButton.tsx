import Link from "next/link";
import { AiTwotoneEdit } from "react-icons/ai";

export default function UpdateButton({url ,className}:{url:string, className?:string}) {
  return (
    <Link
      className={`p-2 bg-yoga-green/10 border-yoga-green/10 dark:border-yoga-yoga/10 text-yoga-green rounded hover:bg-yoga-green/20 border hover:border-yoga-green/50 transition-all duration-300 ${className}`}
      href={url}
    >
      <AiTwotoneEdit size={18} />
    </Link>
  );
}
