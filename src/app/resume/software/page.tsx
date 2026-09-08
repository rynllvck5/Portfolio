import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";
import { resumeVariants } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume — Software",
  description: "Software development resume variant for Raynell Vick F. Abuan.",
};

export default function SoftwareResumePage() {
  return <ResumeView data={resumeVariants.software} showDownload={false} />;
}
