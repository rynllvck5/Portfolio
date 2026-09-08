import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";
import { resumeVariants } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume — General Tech",
  description: "General technology resume variant for Raynell Vick F. Abuan.",
};

export default function GeneralTechResumePage() {
  return <ResumeView data={resumeVariants["general-tech"]} showDownload={false} />;
}
