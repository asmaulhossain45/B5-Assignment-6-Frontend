import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  bgColor?: boolean;
};

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.email("Invalid email address"),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(50, { message: "Subject must be less than 50 characters" }),
  website: z.url("Invalid website URL"),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, {
      message: "Message must be less than 500 characters",
    }),
});

const ContactForm = ({ bgColor }: Props) => {
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      website: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    console.log(data);
    toast.success("Message sent successfully!");
  };
  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit(onSubmit)}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-4",
          bgColor ? "bg-background" : "bg-section",
          "p-6 lg:p-10 max-w-3xl mx-auto rounded-xl border"
        )}
      >
        <FormField
          control={contactForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>

              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                This is your first name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={contactForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>

              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                This is your last name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={contactForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>

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
          control={contactForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>

              <FormControl>
                <Input placeholder="XXXXXXXXXXX" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                This is your phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={contactForm.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>

              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                This is your subject.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={contactForm.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>

              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                This is your website.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Message</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Write your message here..."
                  {...field}
                  className="min-h-24"
                />
              </FormControl>

              <FormDescription className="sr-only">
                This is your message.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="md:col-span-2">
          Send Message
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
