import { Loader2, LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container mx-auto flex h-16 items-center px-4">
        <p className="text-lg font-bold">Better Days</p>
        <div className="ml-auto">
          <AuthInfoContainer />
        </div>
      </div>
    </header>
  );
}

function AuthInfoContainer() {
  const session = useSession();

  console.log(session?.data);

  return (
    <>
      {session.status === "loading" && (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}

      {session.status === "unauthenticated" && (
        <Button onClick={() => signIn("google")}>
          Sign in <LogIn className="ml-2 h-4 w-4" />
        </Button>
      )}

      {session.status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex space-x-2 p-6">
              <p className="text-md font-semibold">{session.data.user.name}</p>
              <Avatar>
                <AvatarImage
                  src={session.data.user.image ?? "/default-avatar.png"}
                  alt={session.data.user.name ?? "User"}
                />
                <AvatarFallback>
                  {session.data.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}