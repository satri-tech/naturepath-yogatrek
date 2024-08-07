import Link from 'next/link';
import { Eye } from "lucide-react";


export default function ViewButton({ url, className }: { url: string, className?:string }) {
  return (
    <Link
      className={`p-2 bg-yoga-blue/10 text-yoga-blue rounded hover:bg-yoga-blue/20 border border-yoga-blue/10 dark:border-yoga-blue/10 hover:border-yoga-blue/50 transition-all duration-300 ${className}`}
      href={url}
    >
      <Eye size={16} />
    </Link>
  );
}
