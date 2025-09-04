import ProfileUpdateForm, {
  FormSchema,
} from "@/components/forms/ProfileUpdateForm";
import { useUpdateAdminProfileMutation } from "@/redux/features/admin/admin.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { toast } from "sonner";
import type z from "zod";

const ProfileManagement = () => {
  const [updateAdminProfile, { isLoading }] = useUpdateAdminProfileMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Updating profile...");

    const payload = {
      ...data,
      dob: data?.dob ? new Date(data.dob) : undefined,
    };

    try {
      await updateAdminProfile(payload).unwrap();
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
