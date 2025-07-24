"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { cn } from "@/lib/utils";

type BreadcrumbItemProps = {
  label?: string;
  href?: string;
  icon?: ReactElement;
  className?: string;
  titleClass?: string;
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
            `text-black/80 dark:text-white dark:!bg-transparent hover:text-primary transition-colors duration-300 text-sm md:text-base ${titleClass}`,
            className
          )}
        >
          {label}
        </span>
      </Link>
    ) : (
      <span
        className={cn(
          `text-black/80 dark:text-white  dark:!bg-transparent hover:text-primary cursor-pointer transition-colors duration-300 text-xs sm:text-sm md:text-base ${titleClass}`,
          className
        )}
      >
        {icon}
      </span>
    )}
  </li>
);

const Breadcrumbs = ({
  className,
  titleClass,
  excludeId = false,
}: {
  className?: string;
  titleClass?: string;
  excludeId?: boolean;
}) => {
  const pathname = usePathname();
  const length = pathname.split("/").length;
  const pathSegments = !excludeId
    ? pathname.split("/").filter(Boolean)
    : pathname.split("/").splice(0, length - 1);

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
        className={`list-none p-0 inline-flex items-center text-sm space-x-1 dark:!bg-transparent ${titleClass}`}
      >
        <BreadcrumbItem href="/" label="Home" className="hover:underline" />
        {pathSegments.map((segment, index) => (

          <>
            <ChevronRight size={15} className="text-black dark:text-white" />
            <BreadcrumbItem
              titleClass={titleClass}
              key={index}
              label={`${" "}${segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`}
              href={`${pathSegments.slice(0, index + 1).join("/")}`}
              className="md:block hidden hover:underline"
            />
          </>

        ))}
        {pathSegments.length > 0 && (
          <BreadcrumbItem
            titleClass={titleClass}
            label={`/${" "}${pathSegments[pathSegments.length - 1]?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`}
            href={`/${pathSegments.join("/")}`}
            className={cn("block md:hidden hover:underline", className)}
          />
        )}
      </ol>
    </>
  );
};

export default Breadcrumbs;
