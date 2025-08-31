import FormHeader from "@/components/common/FormHeader";
import LoginForm from "@/components/forms/LoginForm";
import { LogIn } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="max-w-96 bg-section p-6 rounded-xl space-y-7 border shadow-md">
      <FormHeader
        Icon={LogIn}
        title="Sign in with email"
        description={
          "Enter your email address and password to securely access your account."
        }
      />

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
