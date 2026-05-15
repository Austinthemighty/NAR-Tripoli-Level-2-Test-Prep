import type { Metadata } from "next";
import PracticeExam from "@/components/PracticeExam";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tripoli L2 Practice Exam — 50 questions, timed grading",
  description:
    "Take a simulated Tripoli Level 2 exam: 50 random questions (25 technical + 25 safety code) drawn from the official 108-question pool. Pass = 90% (no more than 5 missed).",
  path: "/tripoli/practice/",
});

export default function TripoliPractice() {
  return (
    <>
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">
          Tripoli L2
        </p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900">Practice exam</h1>
      </header>
      <PracticeExam cert="tripoli" />
    </>
  );
}
