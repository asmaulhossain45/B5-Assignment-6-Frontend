import ProfileUpdateForm, {
  FormSchema,
} from "@/components/forms/ProfileUpdateForm";
import { useUpdateAgentProfileMutation } from "@/redux/features/agent/agent.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const ProfileManagement = () => {
  const navigate = useNavigate();
  const [updateAgentProfile, { isLoading }] = useUpdateAgentProfileMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Updating profile...");

    const payload = {
      ...data,
      dob: data?.dob ? new Date(data.dob) : undefined,
    };

    try {
      await updateAgentProfile(payload).unwrap();
      toast.success("Profile updated successfully!", { id: toastId });
      navigate("/dashboard/agent/profile");
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
