'use client'
import { Home } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

type BreadcrumbItemProps = {
    label?: string ;
    href?: string;
    icon?: ReactElement;
    className?: string;
  };

const BreadcrumbItem = ({ label, href, icon, className }:BreadcrumbItemProps) => (
  <li>
    {label && href? (
      <Link href={href}>
        <span className={`text-gray-600 hover:text-primary transition-colors duration-300 text-xs sm:text-sm md:text-base ${className}`}>
          {label}
        </span>
      </Link>
    ) : (
        <span className={`text-gray-600 hover:text-primary cursor-pointer transition-colors duration-300 text-xs sm:text-sm md:text-base ${className}`}>
        {icon}
      </span>
    )}
  </li>
);

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <>
    <Head>
      <title>{pathSegments[pathSegments.length - 1]?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Home'}</title>
    </Head>
    <ol className="list-none p-0 inline-flex items-center space-x-1">
      <BreadcrumbItem href="/" icon={<Home />} />
      {pathSegments.map((segment, index) => (
        <BreadcrumbItem
          key={index}
          label={`/${" "}${segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`}
          href={`/${pathSegments.slice(0, index + 1).join('/')}`}
          className="md:block hidden"
        />
      ))}
      {pathSegments.length > 0 && 
      <BreadcrumbItem
        label={`/${" "}${pathSegments[pathSegments.length - 1]?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`}
        href={`/${pathSegments.join('/')}`}
        className="block md:hidden"
      />
      }
    </ol>
    </>
  );
};

export default Breadcrumbs;