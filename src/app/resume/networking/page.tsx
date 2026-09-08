import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";
import { resumeVariants } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume — Networking",
  description: "Networking and infrastructure resume variant for Raynell Vick F. Abuan.",
};

export default function NetworkingResumePage() {
  return <ResumeView data={resumeVariants.networking} showDownload={false} />;
}
