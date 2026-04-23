"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createMeetingRequest } from "@repo/api";

export async function submitMeetingRequestAction(formData: FormData) {
  await createMeetingRequest({
    fullName: String(formData.get("fullName") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    message: String(formData.get("message") || ""),
  });

  revalidatePath("/dashboard/meeting-requests");
  redirect("/contact?sent=1");
}