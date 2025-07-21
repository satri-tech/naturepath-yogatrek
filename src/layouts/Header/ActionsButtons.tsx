import { useSession } from "next-auth/react";
import User from "../admin/User";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ActionsButtons() {
    const { data: session } = useSession();

    return <div className=" items-center gap-3 xl:flex hidden">
        {session?.user ? (
            <User />
        ) : (
            <div className="flex items-center gap-2">
                <Link href="/auth/signup">
                    <Button variant="outline" className="font-semibold h-9">Sign up</Button>
                </Link>
                <Link href="/auth/signin">
                    <Button className="bg-green-700  py-1 px-8 h-9 font-semibold">Login</Button>
                </Link>
            </div>
        )}

    </div>
}