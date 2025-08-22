import { Link, NavLink } from "react-router";
import Logo from "@/assets/brand/Logo.png";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import AppSection from "../public/common/AppSection";
import { ThemeToggle } from "../common/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import { Menu } from "lucide-react";
import { Roles } from "@/constants/Roles";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const user = false;

  return (
    <header
      className={cn("fixed w-full top-0 left-0 z-50 border-b", "bg-muted/70 backdrop-blur-3xl")}
    >
      <AppSection
        as="div"
        className="flex items-center justify-between gap-4 py-3"
      >
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 lg:gap-6">
          {navLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "hover:text-primary transition-colors duration-300",
                  isActive && "text-primary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!user && (
            <Link to={"auth/login"} className="hidden lg:block">
              <Button variant={"default"}>Login</Button>
            </Link>
          )}

          {user && (
            <ProfileDropdown role={Roles.USER} className="mt-4">
              <Avatar className="hidden lg:block">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </ProfileDropdown>
          )}

          <MobileMenu user={user} navlinks={navLinks}>
            {!user ? (
              <Button variant={"outline"} size={"icon"} className="lg:hidden">
                <Menu size={18} />
              </Button>
            ) : (
              <Avatar className="lg:hidden">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </MobileMenu>
        </div>
      </AppSection>
    </header>
  );
};

export default Header;
