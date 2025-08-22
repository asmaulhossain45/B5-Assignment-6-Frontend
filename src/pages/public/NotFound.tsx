import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import AppSection from "@/components/public/common/AppSection";

const NotFound = () => {
  return (
    <AppSection
      as="section"
      className="min-h-screen flex flex-col items-center justify-center text-center"
    >
      <h1 className="text-8xl font-bold">404</h1>
      <h3 className="text-2xl font-bold pt-2 pb-1">Oops! Page Not Found</h3>

      <p>The page you are looking for does not exist.</p>

      <NavLink to={"/"} className={"mt-4"}>
        <Button>Go Home</Button>
      </NavLink>
    </AppSection>
  );
};

export default NotFound;
