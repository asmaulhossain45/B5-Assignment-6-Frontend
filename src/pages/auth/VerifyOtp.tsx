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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeInfo, ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be at least 6 characters" }),
});

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {email, action} = location.state;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  console.log(email, action);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Verifying OTP...");
    console.log(data);
    form.reset();
    toast.success("OTP verified successfully!", { id: toastId });
    navigate("/auth/reset-password", { state: { email } });
  };

  return (
    <div className="max-w-96 bg-section p-6 rounded-xl space-y-7 border shadow-md">
      <div className="flex flex-col items-center">
        <div className="bg-background p-3 rounded-lg shadow-md">
          <BadgeInfo size={24} />
        </div>

        <h4 className="text-lg font-bold mt-4 mb-1">Verify OTP</h4>

        <p className="description text-center">
          Check your email and enter the OTP to verify your account.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 gap-4"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">OTP</FormLabel>

                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="flex items-center gap-1">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormDescription className="sr-only">
                  This is your OTP.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full rounded-sm">
            Verify
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

export default VerifyOtp;
