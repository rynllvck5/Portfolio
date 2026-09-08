import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";
import { resumeVariants } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume — IT Support",
  description: "IT support resume variant for Raynell Vick F. Abuan.",
};

export default function ITSupportResumePage() {
  return <ResumeView data={resumeVariants["it-support"]} showDownload={false} />;
}
