'use server'

import { Service } from "@prisma/client";

export const getServiceslist = async (): Promise<Service[] > => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getService`,
      { next: { tags: [`ServicesCollection`], revalidate: 100 } }
    );
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.log(err);
    return [] as Service[];
  }
};
