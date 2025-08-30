
import { TransactionType } from "@/constants/enums";
import z from "zod";

export const TransactionSchema = z.object({
  amount: z.number().min(10, "Minimum transaction amount is 10 BDT"),
  emailOrPhone: z.union([
    z.email("Provide a valid email or phone number"),
    z.string().regex(/^[0-9]{10,15}$/, "Provide a valid email or phone number"),
  ]),
  reference: z.enum(Object.values(TransactionType)).optional(),
  notes: z.string().max(250, "Notes must not exceed 250 characters").optional(),
});
