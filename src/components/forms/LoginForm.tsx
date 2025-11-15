import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { setRole } from "@/utils/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string(),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login(credentials).unwrap();
      setRole(res.data.role);
      form.reset();
      toast.success("Login successful!", { id: toastId });
      navigate("/");
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(
        error?.data?.errorSources[0]?.message ||
          error?.data?.message ||
          "Login failed!",
        { id: toastId }
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email Address</FormLabel>

              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                This is your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>

              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="pr-9"
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn("absolute top-1/2 right-3 -translate-y-1/2")}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="flex justify-end">
                <Link
                  to={"/auth/forgot-password"}
                  className="w-fit text-sm hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <FormDescription className="sr-only">
                This is your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-sm"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
