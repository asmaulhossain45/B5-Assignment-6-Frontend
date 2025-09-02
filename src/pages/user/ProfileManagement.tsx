import ProfileUpdateForm, {
  FormSchema,
} from "@/components/forms/ProfileUpdateForm";
import { useUpdateUserProfileMutation } from "@/redux/features/user/user.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { toast } from "sonner";
import type z from "zod";

const ProfileManagement = () => {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Updating profile...");

    try {
      await updateUserProfile(data).unwrap();
      toast.success("Profile updated successfully!", { id: toastId });
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Failed to update profile!", {
        id: toastId,
      });
    }
  };

  return <ProfileUpdateForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default ProfileManagement;
