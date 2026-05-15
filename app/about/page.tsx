import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Rocket Cert Prep",
  description:
    "What this site is, why it exists, and how to get the most out of it on your way to NAR or Tripoli Level 2 certification.",
  path: "/about/",
});

export default function About() {
  return (
    <article className="prose prose-ink mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-ink-900">About</h1>
      <p className="mt-4 text-ink-700">
        Rocket Cert Prep is a free, unofficial study aid for the two North American Level 2
        high-power rocketry certifications: the{" "}
        <strong>National Association of Rocketry (NAR) Level 2</strong> written exam and the{" "}
        <strong>Tripoli Rocketry Association (TRA) Level 2 Advanced Certification</strong>.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink-900">What you get</h2>
      <ul className="mt-3 list-disc space-y-1 pl-6 text-ink-700">
        <li>
          The full public question pools for both certifications, transcribed from the official
          study guides.
        </li>
        <li>
          A practice-exam mode that matches the real exam in length, section mix, and passing
          threshold.
        </li>
        <li>Topic and section quizzes for targeted study.</li>
        <li>Flashcards for repetition learning.</li>
        <li>
          Browsable study guide with every question, the correct answer, the official rationale,
          and the underlying NFPA / FAR / TUSC reference.
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-ink-900">Exam basics</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-ink-200 bg-white p-4">
          <h3 className="font-semibold">Tripoli L2</h3>
          <p className="mt-1 text-sm text-ink-700">
            50 questions (25 technical + 25 safety code). 108-question pool. Pass = 90% (no more
            than 5 missed). May be taken in writing or orally from a TAP, prefect, or BOD member.
          </p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white p-4">
          <h3 className="font-semibold">NAR L2</h3>
          <p className="mt-1 text-sm text-ink-700">
            40 questions (10 + 3 + 24 + 3). 100-question pool. Pass = 35/40 (~87%). Multiple choice
            with four options per question.
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-ink-900">Privacy</h2>
      <p className="mt-3 text-ink-700">
        No sign-up. No backend. No analytics. Anything you do — quiz progress, exam history,
        starred questions — lives in your own browser's <code>localStorage</code> and never leaves
        your device.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-ink-900">Disclaimer</h2>
      <p className="mt-3 text-ink-700">
        This site is not affiliated with or endorsed by NAR or TRA. The question content is
        reproduced from publicly distributed study guides for educational purposes. The official
        exams may have been updated since the study guides referenced here. Always check the
        current official study guide before taking the certification exam.
      </p>

      <p className="mt-8">
        Ready? <Link href="/tripoli/practice/">Take a Tripoli practice exam</Link> or{" "}
        <Link href="/nar/practice/">a NAR practice exam</Link>.
      </p>
    </article>
  );
}
