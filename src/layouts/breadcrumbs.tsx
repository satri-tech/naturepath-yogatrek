'use client'
import { Home } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';
import { cn } from '@/lib/utils';

type BreadcrumbItemProps = {
    label?: string ;
    href?: string;
    icon?: ReactElement;
    className?: string;
    titleClass?:string;
  };

const BreadcrumbItem = ({
  label,
  href,
  icon,
  className,
  titleClass,
}: BreadcrumbItemProps) => (
  <li>
    {label && href ? (
      <Link href={href}>
        <span
          className={cn(
            `text-black/80 dark:text-text-dark dark:!bg-transparent hover:text-primary transition-colors duration-300 text-sm md:text-base ${titleClass}`,
            className
          )}
        >
          {label}
        </span>
      </Link>
    ) : (
      <span
        className={cn(
          `text-black/80 dark:text-text-dark dark:!bg-transparent hover:text-primary cursor-pointer transition-colors duration-300 text-xs sm:text-sm md:text-base ${titleClass}`,
          className
        )}
      >
        {icon}
      </span>
    )}
  </li>
);

const Breadcrumbs = ({className, titleClass}:{className?:string, titleClass?:string}) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <>
      <Head>
        <title className={`dark:bg-transparent ${titleClass}`}>
          {pathSegments[pathSegments.length - 1]
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()) || "Home"}
        </title>
      </Head>
      <ol
        className={`list-none p-0 inline-flex items-center space-x-1 dark:!bg-transparent ${titleClass}`}
      >
        <BreadcrumbItem href="/" icon={<Home className="w-5 h-5" />} />
        {pathSegments.map((segment, index) => (
          <BreadcrumbItem
            titleClass={titleClass}
            key={index}
            label={`/${" "}${segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`}
            href={`/${pathSegments.slice(0, index + 1).join("/")}`}
            className="md:block hidden"
          />
        ))}
        {pathSegments.length > 0 && (
          <BreadcrumbItem
            titleClass={titleClass}
            label={`/${" "}${pathSegments[pathSegments.length - 1]?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`}
            href={`/${pathSegments.join("/")}`}
            className={cn("block md:hidden", className)}
          />
        )}
      </ol>
    </>
  );
};

export default Breadcrumbs;