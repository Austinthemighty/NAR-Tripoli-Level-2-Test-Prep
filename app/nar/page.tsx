import type { Metadata } from "next";
import CertOverview from "@/components/CertOverview";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NAR Level 2 Practice Exam & Study Guide",
  description:
    "Free NAR Level 2 practice exam, flashcards, and the complete 100-question study pool with answers and rationale. NAR High Power Certification (HPRL2-2020-V2).",
  path: "/nar/",
});

export default function NarPage() {
  return (
    <>
      <JsonLd data={courseJsonLd("nar")} />
      <CertOverview cert="nar" />
    </>
  );
}
