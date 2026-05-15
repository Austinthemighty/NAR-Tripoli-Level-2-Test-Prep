import type { Metadata } from "next";
import SectionPicker from "@/components/SectionPicker";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NAR L2 Section Quiz",
  description:
    "Quiz yourself on NAR Level 2 regulations, motor designations, range & safety, or stability questions. Instant feedback and rationale.",
  path: "/nar/quiz/",
});

export default function NarQuiz() {
  return (
    <>
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">NAR L2</p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900">Quiz</h1>
      </header>
      <SectionPicker cert="nar" mode="quiz" />
    </>
  );
}
