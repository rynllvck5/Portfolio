import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";
import { softwareResume } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "HTML resume for Raynell Vick F. Abuan — software development focus.",
};

export default function ResumePage() {
  return <ResumeView data={softwareResume} />;
}
