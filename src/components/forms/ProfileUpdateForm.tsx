import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender, Roles } from "@/constants/enums";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const FormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  businessName: z
    .string()
    .max(50, "Business name must be less than 50 characters")
    .optional(),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),

  dob: z.date().optional(),

  gender: z.enum(Object.values(Gender)).optional(),
  location: z
    .object({
      division: z.string().optional(),
      district: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
});

type Props = {
  isLoading?: boolean;
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
};

// name, email, dob, phone, gender, location, status, isVerified
const ProfileUpdateForm = ({ isLoading, onSubmit }: Props) => {
  const { currentUser, userRole } = useCurrentUser();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: currentUser?.name ?? "",
      businessName: currentUser?.businessName ?? "",
      email: currentUser?.email ?? "",
      phone: currentUser?.phone ?? "",
      dob: currentUser?.dob ? new Date(currentUser.dob) : undefined,
      gender: currentUser?.gender ?? undefined,
      location: {
        division: currentUser?.location?.division ?? "",
        district: currentUser?.location?.district ?? "",
        address: currentUser?.location?.address ?? "",
      },
    },
    mode: "onChange",
  });

  return (
    <section className="flex items-center justify-center h-full">
      <div className="bg-sidebar grid grid-cols-1 md:grid-cols-4 gap-6 border p-4 md:p-6 w-full max-w-96 md:max-w-2xl">
        <Avatar
          className={cn(
            "md:col-span-1 h-32 w-32 border p-1 mx-auto md:mx-0",
            currentUser?.isVerified ? "border-success" : "border-destructive"
          )}
        >
          <AvatarImage
            src={"https://github.com/shadcn.png"}
            alt={currentUser.name}
            className={cn("object-cover rounded-full")}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="md:col-span-3 w-full border-t pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="rounded-none py-2"
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is your name field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {userRole === Roles.AGENT && (
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Business Name"
                          {...field}
                          className="rounded-none py-2"
                        />
                      </FormControl>

                      <FormDescription className="sr-only">
                        This is your business name field.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        {...field}
                        readOnly
                        className={cn(
                          "rounded-none py-2",
                          currentUser?.email &&
                            "text-muted-foreground cursor-not-allowed"
                        )}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is your email address field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="XXX-XXX-XXXX"
                        {...field}
                        readOnly={!!currentUser?.phone}
                        className={cn(
                          "rounded-none py-2",
                          currentUser?.phone &&
                            "text-muted-foreground cursor-not-allowed"
                        )}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is your phone number field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-input/30 rounded-none w-full capitalize">
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.values(Gender).map((gender, index) => (
                          <SelectItem
                            key={index}
                            value={gender}
                            className="capitalize"
                          >
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      This is your phone number field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>

                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant={"outline"}
                            className="w-full rounded-none justify-between"
                          >
                            {field.value ? (
                              `${formatDate(new Date(field.value))}`
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode={"single"}
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setOpen(false);
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is your date of birth field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Division"
                        {...field}
                        className="rounded-none py-2"
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is your division field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="District"
                        {...field}
                        className="rounded-none py-2"
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is your district field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.address"
                render={({ field }) => (
                  <FormItem
                    className={cn(userRole === Roles.AGENT && "md:col-span-2")}
                  >
                    <FormLabel>Address</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Address"
                        {...field}
                        className="rounded-none py-2"
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is your address field.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="rounded-none py-2"
                disabled={!form.formState.isDirty || isLoading}
              >
                Save
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ProfileUpdateForm;
