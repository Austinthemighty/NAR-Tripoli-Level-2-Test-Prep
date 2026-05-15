import type { Metadata } from "next";
import SectionPicker from "@/components/SectionPicker";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tripoli L2 Section Quiz",
  description:
    "Quiz yourself on Tripoli Level 2 technical or safety code questions. Instant per-question feedback and explanations.",
  path: "/tripoli/quiz/",
});

export default function TripoliQuiz() {
  return (
    <>
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">
          Tripoli L2
        </p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900">Quiz</h1>
      </header>
      <SectionPicker cert="tripoli" mode="quiz" />
    </>
  );
}
