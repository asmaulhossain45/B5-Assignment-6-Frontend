import Logo from "@/assets/brand/Logo.png";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router";
import AppSection from "../common/AppSection";
import { ThemeToggle } from "../common/ThemeToggle";
import { Button } from "../ui/button";
import { CurrentUserAvatar } from "../ui/user-avatar";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const { currentUser } = useCurrentUser();

  return (
    <header
      className={cn(
        "fixed w-full top-0 left-0 z-50 border-b",
        "bg-muted/70 backdrop-blur-3xl"
      )}
    >
      <AppSection
        as="div"
        className="flex items-center justify-between gap-4 py-3"
      >
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="h-10 w-auto" />
        </Link>

        <nav
          id="nav-menu"
          className="hidden lg:flex items-center gap-4 lg:gap-6"
        >
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
          {!currentUser && (
            <Link to={"auth/login"} className="hidden lg:block">
              <Button variant={"default"}>Login</Button>
            </Link>
          )}

          {currentUser && (
            <ProfileDropdown layout="public" className="mt-4">
              <CurrentUserAvatar className="hidden lg:block" />
            </ProfileDropdown>
          )}

          <MobileMenu navlinks={navLinks}>
            {!currentUser ? (
              <Button variant={"outline"} size={"icon"} className="lg:hidden">
                <Menu size={18} />
              </Button>
            ) : (
              <CurrentUserAvatar className="lg:hidden" />
            )}
          </MobileMenu>
        </div>
      </AppSection>
    </header>
  );
};

export default Header;
