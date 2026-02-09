import { Link, useLocation } from "react-router-dom";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";



export function Navbar({ onOpenLogin}) {
    const [profile, setProfile] = React.useState(null);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    const isActiveHash = (hash) => location.hash === hash;

    React.useEffect(() => {
        let mounted = true;
        fetch('/auth/profile')
            .then((res) => {
                if (!res.ok) throw new Error('not-authenticated');
                return res.json();
            })
            .then((data) => {
                if (mounted) setProfile(data);
            })
            .catch(() => {
                
            });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl supports-backdrop-filter:bg-white/30">
            <div className="flex h-18 items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="#" alt="SYNC-AIT Logo" width={18} height={18} className="h-6 w-auto" />
                        <span className="font-jersey-20 text-4xl font-bold text-black/82">SYNC-AIT</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/" className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-transparent data-[state=open]:bg-transparent", isActive("/") && !location.hash ? "text-blue-500" : "text-muted-foreground")}>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                {profile?.role === 'Technical Executive' && (
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link to="/profile/Te" className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-transparent data-[state=open]:bg-transparent", isActive("/profile/Te") ? "text-blue-500" : "text-muted-foreground")}>
                                                Dashboard
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )}

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <a href="/#about" className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-transparent data-[state=open]:bg-transparent", isActiveHash("#about") ? "text-blue-500" : "text-muted-foreground")}>
                                            About Us
                                        </a>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>


                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/clubs" className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-transparent data-[state=open]:bg-transparent", isActive("/clubs") ? "text-blue-500" : "text-muted-foreground")}>
                                            Clubs
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="https://www.gdgaitpune.me/" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-transparent data-[state=open]:bg-transparent">
                                            Team
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/developers" className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-transparent data-[state=open]:bg-transparent", isActive("/developers") ? "text-blue-500" : "text-muted-foreground")}>
                                            Developers
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                       
                       
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="hidden sm:inline-flex text-muted-foreground cursor-pointer"
                                onClick={onOpenLogin}
                            >
                                Login
                            </Button>
                           

                        <Button asChild className="rounded-lg bg-black/20 text-black font-medium px-6 h-9 gap-2 text-sm">
                            <a href="https://github.com/Jitesh-Yadav01/SYNC-AIT" target="_blank">
                                <Github className="w-4 h-4" />
                                Star on GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
