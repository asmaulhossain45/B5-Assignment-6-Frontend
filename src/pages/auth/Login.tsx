import LoginForm from "@/components/public/forms/LoginForm";
import { LogIn } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="max-w-96 bg-section p-6 rounded-xl space-y-7 border shadow-md">
      <div className="flex flex-col items-center">
        <div className="bg-background p-3 rounded-lg shadow-md">
          <LogIn size={24} />
        </div>

        <h4 className="text-lg font-bold mt-4 mb-1">Sign in with email</h4>

        <p className="description text-center">
          Enter your email address and password to securely access your account.
        </p>
      </div>

      <LoginForm />

      <div>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
