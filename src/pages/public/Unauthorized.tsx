import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const Unauthorized = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8">
      <h1 className="text-8xl font-bold">403</h1>
      <h3 className="text-2xl font-bold pt-2 pb-1">Access Denied</h3>

      <p> You don’t have permission to view this page.</p>

      <NavLink to={"/"} className={"mt-4"}>
        <Button>Go Home</Button>
      </NavLink>
    </section>
  );
};

export default Unauthorized;
