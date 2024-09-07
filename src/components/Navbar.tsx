import Image from "next/image";
import Link from "next/link";
import logo from "../../public/kyndryl-logo.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  } from "lucide-react";
import { Red_Hat_Display } from 'next/font/google'
export const redhat_display = Red_Hat_Display({weight: '500', subsets: ['latin']})
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./ModeToggle";
  
  

const Navbar = () => {
    return (
        <header className="flex justify-center">
            <nav className="fixed bg-secondary z-10 flex justify-between h-14 w-[98%] items-center rounded-3xl p-3 mt-3 mx-auto shadow-sm" >
                <Link href='/'>
                    <Image src={logo} alt="Kyndryl" width={110} className="p-3 inline" />
                    <span className="pr-3 text-primary dark:text-primary italic" >|</span>
                    <span className={`${redhat_display.className} antialiased text-xl`} >AIOps Dashboard</span>
                </Link>

                <div className="flex flex-row" >
                    <ModeToggle/>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>😎</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Welcome &#123;fetchError://user.name&#125;</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>LogOut</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </nav>
        </header>
     );
}
 
export default Navbar;