import ProfileUpdateForm, {
  FormSchema,
} from "@/components/forms/ProfileUpdateForm";
import { toast } from "sonner";
import type z from "zod";

const ProfileManagement = () => {
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    toast.success("Profile updated successfully!");
  };
  return <ProfileUpdateForm onSubmit={onSubmit} />;
};

export default ProfileManagement;
