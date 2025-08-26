import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { Roles } from "@/constants/Roles";
import { cn } from "@/lib/utils";
import {
  useRegisterAgentMutation,
  useRegisterUserMutation,
} from "@/redux/features/auth/auth.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

type Props = {
  role: "user" | "agent";
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const RegisterForm = ({ role }: Props) => {
  const [registerUser, { isLoading: isLoadingUser }] =
    useRegisterUserMutation();
  const [registerAgent, { isLoading: isLoadingAgent }] =
    useRegisterAgentMutation();

  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "user demo",
      email: "userdemo@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Registering...");

    try {
      if (role === Roles.USER) {
        await registerUser(data).unwrap();
        toast.success("User Register successful!", { id: toastId });
        navigate("/auth/login");
      } else if (role === Roles.AGENT) {
        await registerAgent(data).unwrap();
        toast.success("Agent Register successful!", { id: toastId });
        navigate("/auth/login");
      }
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      const message = error?.data?.message || "Registration failed!";
      toast.error(message, { id: toastId });
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Your Name</FormLabel>

              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                This is your name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email Address</FormLabel>

              <FormControl>
                <Input placeholder="example@xyz.com" {...field} />
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
                    placeholder="********"
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

              <FormDescription className="sr-only">
                This is your password.
              </FormDescription>
              <FormMessage />

              <div className="flex items-center gap-3 mt-1">
                <Checkbox
                  id="terms"
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!acceptTerms || isLoadingUser || isLoadingAgent}
          className="w-full rounded-sm"
        >
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
