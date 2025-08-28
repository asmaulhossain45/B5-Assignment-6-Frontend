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
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeOff, ShieldEllipsis } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state;
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Resetting password...");
    try {
      await resetPassword({
        email,
        otp,
        newPassword: data.newPassword,
      }).unwrap();
      form.reset();
      toast.success("Password reset successfully!", { id: toastId });
      navigate("/auth/login");
    } catch (error) {
      const err = error as { data: TErrorResponse };
      const message = err?.data?.message || "Something went wrong!";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="max-w-96 bg-section p-6 rounded-xl space-y-7 border shadow-md">
      <div className="flex flex-col items-center">
        <div className="bg-background p-3 rounded-lg shadow-md">
          <ShieldEllipsis size={24} />
        </div>

        <h4 className="text-lg font-bold mt-4 mb-1">Reset Password?</h4>

        <p className="description text-center">
          Enter new password and confirm password to reset your password.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 gap-4"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">New Password</FormLabel>

                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      {...field}
                      type={showNewPassword ? "text" : "password"}
                      className="pr-9"
                    />
                  </FormControl>

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={cn("absolute top-1/2 right-3 -translate-y-1/2")}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <FormDescription className="sr-only">
                  This is your new password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Confirm Password</FormLabel>

                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      className="pr-9"
                    />
                  </FormControl>

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={cn("absolute top-1/2 right-3 -translate-y-1/2")}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                <FormDescription className="sr-only">
                  This is your confirm password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-sm"
          >
            Submit
          </Button>
        </form>
      </Form>

      <div className="flex justify-center">
        <Link
          to="/auth/login"
          className="inline-flex items-center text-sm text-primary hover:underline font-medium"
        >
          <ChevronLeft size={18} /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
