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
import { useSendResetOtpMutation } from "@/redux/features/auth/auth.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, CircleQuestionMark } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email("Enter a valid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [sendResetOtp, { isLoading }] = useSendResetOtpMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "asmaulhosen45@gmail.com",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Sending OTP...");
    try {
      await sendResetOtp(data).unwrap();
      form.reset();
      toast.success("OTP sent successfully!", { id: toastId });
      navigate("/auth/verify-otp", {
        state: { email: data.email, action: "resetPassword" },
      });
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
          <CircleQuestionMark size={24} />
        </div>

        <h4 className="text-lg font-bold mt-4 mb-1">Forgot Password?</h4>

        <p className="description text-center">
          Enter your email and we’ll send you a OTP to reset your password.
        </p>
      </div>

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

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-sm"
          >
            Send OTP
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

export default ForgotPassword;
