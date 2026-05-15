import type { Metadata } from "next";
import CertOverview from "@/components/CertOverview";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, courseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tripoli Level 2 Practice Exam & Study Guide",
  description:
    "Free Tripoli Level 2 practice exam, flashcards, and the complete 108-question study pool with answers and rationale. TRA Advanced Certification (Handbook 3-4.2).",
  path: "/tripoli/",
});

export default function TripoliPage() {
  return (
    <>
      <JsonLd data={courseJsonLd("tripoli")} />
      <CertOverview cert="tripoli" />
    </>
  );
}
