import type { Metadata } from "next";
import PracticeExam from "@/components/PracticeExam";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NAR L2 Practice Exam — 40 questions, instant grading",
  description:
    "Simulated NAR Level 2 written exam: 40 random questions (10 regulations + 3 motor designations + 24 range & safety + 3 stability). Pass = 35/40 (≈87%).",
  path: "/nar/practice/",
});

export default function NarPractice() {
  return (
    <>
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">NAR L2</p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900">Practice exam</h1>
      </header>
      <PracticeExam cert="nar" />
    </>
  );
}
