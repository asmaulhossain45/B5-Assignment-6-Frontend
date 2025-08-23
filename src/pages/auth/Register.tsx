/* eslint-disable @typescript-eslint/no-unused-vars */
import RegisterForm from "@/components/public/forms/RegisterForm";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router";



const Register = () => {
  const [role, setRole] = useState<"user" | "agent">("user");


  return (
    <div className="max-w-96 bg-section p-6 rounded-xl space-y-7 border shadow-md">
      <div className="flex flex-col items-center">
        <h4 className="text-lg font-bold">Sign up with email</h4>

        <p className="description text-center">
          Enter your email address and password to securely access your account.
        </p>

        <div
          className={cn(
            "relative grid grid-cols-2 gap-4 mt-4 border",
            "bg-background py-1 px-4 rounded-sm overflow-hidden"
          )}
        >
          <div
            className={cn(
              "w-1/2 h-full bg-primary",
              "absolute top-0 transition-all duration-300",
              role === "user" ? "left-[0%]" : "left-[50%]"
            )}
          />
          <button
            onClick={() => setRole("user")}
            className={cn(
              "relative text-sm transition-colors duration-300",
              role === "user" && "text-light"
            )}
          >
            User
          </button>
          <button
            onClick={() => setRole("agent")}
            className={cn(
              "relative text-sm transition-colors duration-300",
              role === "agent" && "text-light"
            )}
          >
            Agent
          </button>
        </div>
      </div>

      <RegisterForm role={role} />

      <div>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
