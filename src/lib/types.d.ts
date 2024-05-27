import {User} from "@prisma/client";


type UserWithAccessToken = User & { accessToken: string };

declare module "next-auth"{
    interface Session{
        user: UserWithAccessToken;
    } 
}
declare module "next-auth"{
    interface jwt{
        user: UserWithAccessToken;
    } 
}