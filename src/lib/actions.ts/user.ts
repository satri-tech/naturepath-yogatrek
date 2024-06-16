import { useSession } from "next-auth/react";



export const GetUserData = async (): Promise<any> => {
  try {
    const session = await useSession(); // Retrieve the session
    console.log("session",session);
    if (!session) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUser`,
      {
        headers: {
          'Authorization': `Bearer ${session}`, // Set the authorization header
        },
        next: { tags: [`userprofile`], revalidate: 100 }
      }
    );
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return [] ;
  }
};
