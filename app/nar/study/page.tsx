import type { Metadata } from "next";
import StudyView from "@/components/StudyView";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { getQuestionsByCert } from "@/lib/questions";

export const metadata: Metadata = buildMetadata({
  title: "NAR L2 Study Guide — all 100 questions with answers",
  description:
    "Complete NAR Level 2 study guide: every question across Regulations, Motor Designations, Range & Safety, and Stability — with answers, explanations, and NFPA / FAR references.",
  path: "/nar/study/",
});

export default function NarStudy() {
  const all = getQuestionsByCert("nar");
  return (
    <>
      <JsonLd data={faqJsonLd(all)} />
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">NAR L2</p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900">Study guide</h1>
        <p className="mt-1 text-ink-700">
          All {all.length} questions with answers, rationale, and NFPA/FAR references.
        </p>
      </header>
      <StudyView cert="nar" />
    </>
  );
}
