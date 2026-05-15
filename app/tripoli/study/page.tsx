import type { Metadata } from "next";
import StudyView from "@/components/StudyView";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { getQuestionsByCert } from "@/lib/questions";

export const metadata: Metadata = buildMetadata({
  title: "Tripoli L2 Study Guide — all 108 questions with answers",
  description:
    "Complete Tripoli Level 2 study guide: every technical and safety code question with the correct answer, official rationale, and TUSC reference. Search and filter by section.",
  path: "/tripoli/study/",
});

export default function TripoliStudy() {
  const all = getQuestionsByCert("tripoli");
  return (
    <>
      <JsonLd data={faqJsonLd(all)} />
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">
          Tripoli L2
        </p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900">Study guide</h1>
        <p className="mt-1 text-ink-700">
          All {all.length} questions with answers and rationale.
        </p>
      </header>
      <StudyView cert="tripoli" />
    </>
  );
}
